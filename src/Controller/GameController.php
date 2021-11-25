<?php

namespace App\Controller;

class GameController extends AbstractController
{
    public function game()
    {
        return $this->twig->render('Game/game.html.twig');
    }

    public function tuto()
    {
        return $this->twig->render('Game/tuto.html.twig');
    }
}
