<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\User;
use Illuminate\View\View;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(): View
    {
        return view('clients.index');
    }

    public function create()
    {
        $users = User::isActive()->get();
        return view('clients.create', compact('users'));
    }

    public function store(ClientRequest $request)
    {
        $client = Client::create([
            'name' => $request->name,
            'domain' => $request->domain,
            'api_key' => $request->api_key,
        ]);
        if (!empty($request->users)) $client->users()->sync($request->users);
        return redirect()->route('clients.index');
    }


    public function show(Client $client)
    {
        $client->load('users');
        return view('clients.show', compact('client'));
    }

    public function edit(Client $client)
    {
        $users = User::with('clients')->isActive()->get();
        return view('clients.edit', compact('client', 'users'));
    }

    public function update(ClientRequest $request, Client $client)
    {
        $client->update([
            'name' => $request->name,
            'domain' => $request->domain,
            'api_key' => $request->api_key,
        ]);
        if (!empty($request->users)) $client->users()->sync($request->users);
        return redirect()->route('clients.index');
    }

    public function toggleActive(Client $client)
    {
        $client->update(['is_active' => !$client->is_active]);
        $client->fresh();
        return response()->json(['message' => 'successfully', 'is_active' => $client->is_active]);
    }

    public function getClients(Request $request)
    {
        $col_order = ['id', 'name', 'domain'];
        $query = auth()->user()->clients()->getQuery();
        $total_data  = $query->count();
        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $col_order[$request->input('order.0.column') ?? 0];
        $dir = $request->input('order.0.dir') ?? 'desc';
        $total_filtered = 0;
        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('domain', 'LIKE', '%' . $search . '%');
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
            $nest['domain'] = $item->domain;
            $nest['is_active'] = $item->is_active;
            $rows[] = $nest;
        }
        return $rows;
    }
}
