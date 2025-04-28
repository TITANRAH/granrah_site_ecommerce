import React from "react";
import { User2, Headphones, Award, Mic2 } from "lucide-react";

export const aboutItems = [
  {
    title: "¿Quién es Gran Rah?",
    content:
      "Gran Rah es un artista multifacético que fusiona diferentes estilos musicales para crear un sonido único y personal. Con una trayectoria que abarca más de una década en la escena musical, ha logrado desarrollar un estilo distintivo que mezcla rap, hip-hop y elementos de música electrónica.",
    icon: <User2 className="text-red-400" size={24} />,
    imageKey: "quien",
  },
  {
    title: "Trayectoria Musical",
    content:
      "Comenzando desde los inicios del hip-hop underground, Gran Rah ha evolucionado constantemente, experimentando con diferentes géneros y colaborando con diversos artistas. Su música refleja experiencias personales y una visión única del mundo contemporáneo.",
    icon: <Headphones className="text-red-400" size={24} />,
    imageKey: "trayectoria",
  },
  {
    title: "Logros",
    content:
      "A lo largo de su carrera, ha participado en numerosos festivales y eventos importantes de la escena musical. Sus proyectos han sido reconocidos por su originalidad y calidad, estableciéndolo como una figura respetada en la comunidad artística.",
    icon: <Award className="text-red-400" size={24} />,
    imageKey: "logros",
  },
  {
    title: "Colaboraciones",
    content:
      "Su estilo se caracteriza por beats innovadores, letras profundas y una producción musical de alta calidad. Cada proyecto es cuidadosamente elaborado, prestando atención a cada detalle para crear experiencias musicales únicas.",
    icon: <Mic2 className="text-red-400" size={24} />,
    imageKey: "estilo",
  },
];
