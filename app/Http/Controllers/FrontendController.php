<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\LikeEvent;
use App\Events\SendWsEvent;

class FrontendController extends Controller
{
    public function like(Request $request){

        dd($request);
        $params = [
            'name'      => $request->name,
            'message'   => $request->name. ' foi emitida com sucesso',
            'id'        => $request->id
        ];

        $headers = (array) $request->header();
        $endpoint = 'like';
        event(new LikeEvent($headers, $params, $endpoint));
    }

    public function send(Request $request){
        $params = [
            'box' => $request->box,
            'msg' => $request->msg
        ];
        event(new SendWsEvent($params, 'send'));
    }
}
