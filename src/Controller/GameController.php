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

    public function win()
    {
        $result = 0;
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = array_map('trim', $_POST);
            if ($name['name'] === 'Katy Perry' ||
                $name['name'] === 'Katy perry' ||
                $name['name'] === 'katy perry' ||
                $name['name'] === 'firework' ||
                $name['name'] === 'fireworks' ) {
                $result = 1;
            } else {
                $result = 2;
            }
        }
        return $this->twig->render('Game/win.html.twig', [
            'result' => $result,
        ]);
    }
}
