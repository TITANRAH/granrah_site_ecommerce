"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createDiscountCode } from "@/actions/game/create.discount.code.action";
import { Session } from "next-auth";

interface GameState {
  isPlaying: boolean;
  score: number;
  highScore: number;
}

interface DinoGameProps {
  session: Session | null;
}

export const DinoGame = ({ session }: DinoGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    highScore: 0,
  });

  const dino = useRef({
    x: 50,
    y: 0,
    width: 50,
    height: 50,
    jumping: false,
    jumpForce: 0,
    gravity: 0.7,
    velocity: 0,
  });

  const obstacles = useRef<{ x: number; width: number; height: number }[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const nextObstacleTime = useRef(Date.now() + 700 + Math.random() * 1200);
  const dinoImg = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Cargar el icono del sitio
  useEffect(() => {
    dinoImg.current = new window.Image();
    dinoImg.current.src = "/images/landing/logo.png"; // Ajusta la ruta si es necesario
    dinoImg.current.width = 50;
    dinoImg.current.onload = () => setImgLoaded(true);
    dinoImg.current.onerror = () => setImgLoaded(false);
  }, []);

  const initGame = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 200;

    // Dibujar el suelo
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Dibujar el dinosaurio
    ctx.fillStyle = "#000";
    ctx.fillRect(
      dino.current.x,
      canvas.height - dino.current.height - 10,
      dino.current.width,
      dino.current.height
    );
  }, []);

  const jump = useCallback(() => {
    if (!dino.current.jumping && dino.current.y === 0) {
      dino.current.jumping = true;
      dino.current.velocity = 12;
    }
  }, []);

  const gameOver = useCallback(async () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    setGameState((prev) => ({
      ...prev,
      isPlaying: false,
      highScore: Math.max(prev.score, prev.highScore),
    }));

    if (session && gameState.score > 0) {
      try {
        const result = await createDiscountCode({ score: gameState.score });

        if (result.success && result.data) {
          alert(
            `¡Felicidades! Has ganado un código de descuento: ${result.data.code}`
          );
        }
      } catch (error) {
        console.error("Error al generar código de descuento:", error);
      }
    }
  }, [gameState.score, session]);

  const updateGame = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Definir variables del dino para colisión y render
    const dinoX = dino.current.x;
    const dinoY = canvas.height - dino.current.height - 10 - dino.current.y;
    const dinoW = dino.current.width;
    const dinoH = dino.current.height;

    // Actualizar posición del dinosaurio
    if (dino.current.jumping) {
      dino.current.y += dino.current.velocity;
      dino.current.velocity -= dino.current.gravity;

      if (dino.current.y <= 0) {
        dino.current.y = 0;
        dino.current.jumping = false;
        dino.current.velocity = 0;
      }
    }

    // Dificultad progresiva
    const dificultad = Math.min(gameState.score, 30);
    const speed = 7 + Math.floor(gameState.score / 7);
    const minInterval = Math.max(200, 500 - dificultad * 10);
    const maxInterval = Math.max(500, 1000 - dificultad * 10);

    // Obstáculos aleatorios y más difíciles
    const currentTime = Date.now();
    if (currentTime > nextObstacleTime.current) {
      obstacles.current.push({
        x: canvas.width,
        width: 25 + Math.random() * (25 + dificultad),
        height: 35 + Math.random() * (35 + dificultad),
      });
      nextObstacleTime.current =
        currentTime + minInterval + Math.random() * (maxInterval - minInterval);
    }

    // Actualizar obstáculos
    for (let i = obstacles.current.length - 1; i >= 0; i--) {
      const obstacle = obstacles.current[i];
      if (!obstacle) continue;

      const obsX = obstacle.x;
      const obsY = canvas.height - obstacle.height - 10;
      const obsW = obstacle.width;
      const obsH = obstacle.height;

      obstacle.x -= speed;

      // Eliminar obstáculos fuera de la pantalla
      if (obstacle.x + obstacle.width < 0) {
        obstacles.current.splice(i, 1);
        setGameState((prev) => ({ ...prev, score: prev.score + 1 }));
        continue;
      }

      // Detectar colisiones (AABB)
      if (
        dinoX < obsX + obsW &&
        dinoX + dinoW > obsX &&
        dinoY < obsY + obsH &&
        dinoY + dinoH > obsY
      ) {
        gameOver();
        return;
      }

      // Dibuja cada obstáculo
      ctx.fillStyle = "#666";
      ctx.fillRect(obsX, obsY, obsW, obsH);
      ctx.strokeStyle = "red";
      ctx.strokeRect(obsX, obsY, obsW, obsH);
    }

    // Dibujar todo
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

    // Dibuja el dino
    if (dinoImg.current && imgLoaded) {
      ctx.drawImage(dinoImg.current, dinoX, dinoY, dinoW, dinoH);
    } else {
      ctx.fillStyle = "#000";
      ctx.fillRect(dinoX, dinoY, dinoW, dinoH);
    }
    ctx.strokeStyle = "red";
    ctx.strokeRect(dinoX, dinoY, dinoW, dinoH);

    // Dibujar puntaje
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${gameState.score}`, 20, 30);

    animationFrameId.current = requestAnimationFrame(updateGame);
  }, [gameState.score, gameOver, imgLoaded]);

  const startGame = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPlaying: true, score: 0 }));
    obstacles.current.length = 0;
    dino.current.y = 0;
    dino.current.jumping = false;
    updateGame();
  }, [updateGame]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault(); // Evita el scroll
      if (!gameState.isPlaying) {
        startGame();
      } else {
        jump();
      }
    }
  };

  useEffect(() => {
    initGame();
    window.addEventListener("keydown", handleKeyPress);
    if (gameState.isPlaying) {
      updateGame();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [gameState.isPlaying, initGame, jump, startGame, updateGame]);

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
      {!gameState.isPlaying && (
        <div className="text-center mt-4">
          <p className="text-xl mb-2">Presiona ESPACIO para comenzar</p>
          <p>Puntuación más alta: {gameState.highScore}</p>
        </div>
      )}
    </div>
  );
};
