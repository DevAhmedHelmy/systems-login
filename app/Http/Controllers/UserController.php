<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\View\View;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(): View
    {
        return view('users.index');
    }

    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    public function getUsers(Request $request)
    {
        $col_order = ['id', 'name', 'email'];
        $query = User::query();
        $total_data  = $query->count();
        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $col_order[$request->input('order.0.column')?? 'id'];
        $dir = $request->input('order.0.dir') ?? 'desc';
        $total_filtered = 0;
        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('name', 'LIKE', '%' . $search . '%');
            $total_filtered = $query->count();
        }
        $start = ($request->start) ? $request->start : 0;
        $total_filtered = $total_filtered == 0 ? $total_data : $total_filtered;
        if ($limit != null) {
            $query->skip($start)->take($limit);
        }
        $data = $query->orderBy($order, $dir)->get();

        $json = array(
            'draw'              =>  intval($request->input('draw')),
            'recordsTotal'      =>  intval($total_data),
            'recordsFiltered'   =>  intval($total_filtered),
            'data'              =>  $this->drawTable($data)
        );
        return json_encode($json);
    }


    public function drawTable($data)
    {
        $rows = array();
        foreach ($data as $item) {
            $nest['id'] = $item->id;
            $nest['name'] = $item->name;
            $nest['email'] = $item->email;
            $nest['role'] = $item->role;
            $nest['status'] = $item->is_active;
            $rows[] = $nest;
        }
        return $rows;
    }
}
