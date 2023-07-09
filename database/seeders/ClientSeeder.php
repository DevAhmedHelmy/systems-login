<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('user_client')->truncate();
        Client::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        $clients = ['imc', 'dsfh', 'kaust', 'kauh', 'almoosa', 'moh', 'kamc', 'jhah', 'jcci', 'khcc', 'kfshrc', 'kfshd', 'magrabi', 'sms', 'mms', 'msd', 'hcac', 'das', 'kfsh', 'scfhs'];

        foreach($clients as $client)
        {
            Client::create([
                'name' => $client,
                'domain' => $client
            ]);
        }
    }
}
