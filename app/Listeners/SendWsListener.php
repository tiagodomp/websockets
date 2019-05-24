<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendWsListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $urlSite        = 'ws://localhost:8001/';
        $urlWebSocket   = $urlSite.$event->endpoint;

        $dataParams     = http_build_query($event->params);
        $ch             = curl_init();

        try{
            curl_setopt($ch, CURLOPT_URL, $urlWebSocket);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
            curl_setopt($ch, CURLOPT_POSTFIELDS, $dataParams);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));

            $response   = curl_exec($ch); dd( $response);
        }
        catch(Exception $e){

            return $e;
        }
    }
}
