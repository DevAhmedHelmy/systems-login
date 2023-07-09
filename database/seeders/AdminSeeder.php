<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@health-links.me',
            'phone' => '0123456789',
            'password' => Hash::make('S43M4*y4b@DE'),
            'role' => 'admin',
        ]);

        $clients = Client::pluck('id');
        $user->clients()->attach($clients);
    }
}
