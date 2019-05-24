<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Curtir extends Controller
{
    public function index(){
        $user = 'User_1';
        return view('curtir', ['user']);
    }
}
