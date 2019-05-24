<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\NewMessage;

class Home extends Controller
{

    public function __construct(Request $request)
    {
        $M = event(NewMessage::$request->all());
    }
}
