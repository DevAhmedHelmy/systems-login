<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\{User, Client};
use App\Enums\UserRoles;
use App\Mail\NewUserMail;
use Illuminate\View\View;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\{DB, Hash, Mail};
use Illuminate\Http\{Request, JsonResponse, RedirectResponse};


class UserController extends Controller
{
    public function index(): View
    {
        return view('users.index');
    }

    public function create(): View
    {
        $clients = Client::isActive()->get(['id', 'name']);
        return view('users.create', compact('clients'));
    }

    public function store(UserRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'username' => $request->username,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => UserRoles::USER_ROLE,
            ]);

            if (!empty($request->clients)) $user->clients()->sync($request->clients);
            $this->sendCredentialsData($user->email, $request->password);
        });

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }


    public function edit(User $user): View
    {
        $clients = Client::isActive()->get(['id', 'name']);
        return view('users.edit', compact('user', 'clients'));
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        DB::transaction(
            function () use ($request, $user) {
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email,
                    'username' => $request->username,
                    'phone' => $request->phone,
                    'password' => $request->password ?  Hash::make($request->password) : $user->password,
                    'role' => UserRoles::USER_ROLE,
                ]);
                if ($request->clients) $user->clients()->sync($request->clients);
                if ($request->password) $this->sendCredentialsData($user->email, $request->password);
            }
        );
        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    public function show(User $user): View
    {
        $user->load('clients');
        return view('users.show', compact('user'));
    }

    public function toggleActive(User $user): JsonResponse
    {
        if ($user->id == auth()->user()->id)
            return response()->json(['message' => 'you cannot toggle your own account'], 403);
        $user->update(['is_active' => !$user->is_active]);
        $user->fresh();
        return response()->json(['message' => 'successfully', 'is_active' => $user->is_active]);
    }

    public function getUsers(Request $request): String
    {
        $col_order = ['id', 'name', 'email'];
        $query = User::query();
        $total_data  = $query->count();
        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $col_order[$request->input('order.0.column') ?? 0];
        $dir = $request->input('order.0.dir') ?? 'desc';
        $total_filtered = 0;
        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('email', 'LIKE', '%' . $search . '%')
                ->orWhere('phone', 'LIKE', '%' . $search . '%')
                ->orWhere('username', 'LIKE', '%' . $search . '%');
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
            $nest['id'] = $item->id;
            $nest['name'] = $item->name;
            $nest['email'] = $item->email;
            $nest['role'] = $item->role;
            $nest['status'] = $item->is_active;
            $rows[] = $nest;
        }
        return $rows;
    }

    private function sendCredentialsData($email, $password)
    {
        try {
            $details = [
                'title' => 'Credentials Data',
                'mail' => $email,
                'password' => $password
            ];
            Mail::to($email)->send(new NewUserMail($details));
        } catch (Exception $e) {
            info("Error: " . $e->getMessage());
        }
    }
}
