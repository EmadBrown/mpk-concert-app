<?php

Class Services
{

    function getToken($user)
    {
        return array(
            "iss" => $this->iss,
            "aud" => $this->aud,
            "iat" => $this->iat,
            "nbf" => $this->nbf,
            //    "exp" => $exp,
            "data" => array(
                "id" => $user->id,
                "firstName" => $user->firstName,
                "lastName" => $user->lastName,
                "email" => $user->email,
                "balance" => $user->balance,
                "comment" => $user->comment,
                "inEvent" => $user->inEvent,
                "inCamping" => $user->inCamping,
                "created" => $user->created,
                "modified" => $user->modified,
                "role" => $user->email == 'admin@mpk.com' ? 'admin' : 'user'
            )
        );
    }

}

