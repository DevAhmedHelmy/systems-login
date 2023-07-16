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
        $user1 = User::create([
            'name' => 'Ahmed Helmy',
            'username' => 'ahelmy',
            'email' => 'ahelmy@health-links.me',
            'phone' => '0123456789',
            'password' => Hash::make('S43M4*y4b@DE'),
            'role' => 'admin',
        ]);

        $user2 = User::create([
            'name' => 'adel wafa',
            'username' => 'awafa',
            'email' => 'awafa@health-links.me',
            'phone' => '0123456789',
            'password' => Hash::make('S43M4*y4b@DE'),
            'role' => 'admin',
        ]);

        $clients = Client::pluck('id');
        $user1->clients()->attach($clients);
        $user2->clients()->attach($clients);
    }
}
