<?php

namespace App\Http\Controllers;

use Illuminate\View\View;
use Illuminate\Http\Request;
use App\Models\{Client, User};
use App\Http\Requests\ClientRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ClientController extends Controller
{
    public function index(): View
    {
        if (auth()->user()->role == 'admin')
            return view('clients.index');

        $clients = auth()->user()->clients;
        return view('clients.index', compact('clients'));
    }

    public function create(): View
    {
        $users = User::isActive()->get(['id', 'name']);
        return view('clients.create', compact('users'));
    }

    public function store(ClientRequest $request): RedirectResponse
    {
        $client = Client::create($request->except('users'));
        if (!empty($request->users)) $client->users()->sync($request->users);
        return redirect()->route('clients.index')->with('success', 'Client Created Successfully');
    }


    public function show(Client $client): View
    {
        $client->load('users');
        return view('clients.show', compact('client'));
    }

    public function edit(Client $client): View
    {
        $client->load('users');
        $users = User::isActive()->get(['id', 'name']);
        return view('clients.edit', compact('client', 'users'));
    }

    public function update(ClientRequest $request, Client $client): RedirectResponse
    {
        $client->update($request->except('users'));
        if (!empty($request->users)) $client->users()->sync($request->users);
        return redirect()->route('clients.index')->with('success', 'Client Updated Successfully');
    }

    public function toggleActive(Client $client): JsonResponse
    {
        $client->update(['is_active' => !$client->is_active]);
        $client->fresh();
        return response()->json(['message' => 'successfully', 'is_active' => $client->is_active]);
    }

    public function getClients(Request $request): String
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

    public function drawTable($data): array
    {
        $rows = array();
        foreach ($data as $item) {
            $link = "<a href='#'>{$item->name}</a>";
            $nest['id'] = $item->id;
            $nest['name'] = $link;
            $nest['domain'] = $item->domain;
            $nest['is_active'] = $item->is_active;
            $rows[] = $nest;
        }
        return $rows;
    }
}
