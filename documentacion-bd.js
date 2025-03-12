/**
 * DOCUMENTACIÓN DE BASE DE DATOS - PLATAFORMA EDUCATIVA
 *
 * Este archivo contiene la documentación completa de la estructura de base de datos,
 * seguridad, configuración y recomendaciones para la plataforma educativa.
 */

console.log("# DOCUMENTACIÓN DE BASE DE DATOS - PLATAFORMA EDUCATIVA")
console.log("\n## 1. ESQUEMA DE BASE DE DATOS\n")

// Definición de tablas principales
const tablas = {
  usuarios: {
    nombre: "usuarios",
    descripcion: "Almacena información de todos los usuarios del sistema",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del usuario", esPrimario: true },
      {
        nombre: "tipo_usuario",
        tipo: "ENUM",
        descripcion: "Tipo de usuario: estudiante, profesor, administrador",
        valores: ["estudiante", "profesor", "administrador"],
      },
      { nombre: "nombre", tipo: "VARCHAR(100)", descripcion: "Nombre completo del usuario" },
      { nombre: "email", tipo: "VARCHAR(100)", descripcion: "Correo electrónico del usuario", esUnico: true },
      { nombre: "password_hash", tipo: "VARCHAR(255)", descripcion: "Hash de la contraseña del usuario" },
      { nombre: "fecha_creacion", tipo: "TIMESTAMP", descripcion: "Fecha de creación del usuario" },
      { nombre: "ultima_conexion", tipo: "TIMESTAMP", descripcion: "Última vez que el usuario inició sesión" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado del usuario",
        valores: ["activo", "inactivo", "suspendido"],
      },
      { nombre: "avatar_url", tipo: "VARCHAR(255)", descripcion: "URL de la imagen de perfil" },
      {
        nombre: "configuracion_notificaciones",
        tipo: "JSON",
        descripcion: "Configuración de notificaciones del usuario",
      },
    ],
    indices: [
      { nombre: "idx_usuarios_email", campos: ["email"], tipo: "UNIQUE" },
      { nombre: "idx_usuarios_tipo", campos: ["tipo_usuario"], tipo: "BTREE" },
    ],
  },

  estudiantes: {
    nombre: "estudiantes",
    descripcion: "Información específica de estudiantes",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del estudiante", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Referencia al usuario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "grado", tipo: "VARCHAR(50)", descripcion: "Grado académico del estudiante" },
      { nombre: "grupo", tipo: "VARCHAR(10)", descripcion: "Grupo al que pertenece el estudiante" },
      { nombre: "fecha_nacimiento", tipo: "DATE", descripcion: "Fecha de nacimiento del estudiante" },
      {
        nombre: "tutor_id",
        tipo: "UUID",
        descripcion: "ID del tutor o padre",
        esForaneo: true,
        referencia: "tutores(id)",
      },
      { nombre: "promedio_general", tipo: "DECIMAL(4,2)", descripcion: "Promedio general del estudiante" },
      { nombre: "asistencia_porcentaje", tipo: "DECIMAL(5,2)", descripcion: "Porcentaje de asistencia" },
    ],
    indices: [
      { nombre: "idx_estudiantes_usuario", campos: ["usuario_id"], tipo: "UNIQUE" },
      { nombre: "idx_estudiantes_grado_grupo", campos: ["grado", "grupo"], tipo: "BTREE" },
    ],
  },

  profesores: {
    nombre: "profesores",
    descripcion: "Información específica de profesores",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del profesor", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Referencia al usuario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "especialidad", tipo: "VARCHAR(100)", descripcion: "Especialidad del profesor" },
      { nombre: "departamento", tipo: "VARCHAR(100)", descripcion: "Departamento al que pertenece" },
      { nombre: "fecha_contratacion", tipo: "DATE", descripcion: "Fecha de contratación" },
      { nombre: "nivel_educativo", tipo: "VARCHAR(100)", descripcion: "Nivel educativo del profesor" },
    ],
    indices: [
      { nombre: "idx_profesores_usuario", campos: ["usuario_id"], tipo: "UNIQUE" },
      { nombre: "idx_profesores_especialidad", campos: ["especialidad"], tipo: "BTREE" },
    ],
  },

  administradores: {
    nombre: "administradores",
    descripcion: "Información específica de administradores",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del administrador", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Referencia al usuario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "rol", tipo: "VARCHAR(50)", descripcion: "Rol específico del administrador" },
      { nombre: "permisos", tipo: "JSON", descripcion: "Permisos específicos del administrador" },
    ],
    indices: [{ nombre: "idx_administradores_usuario", campos: ["usuario_id"], tipo: "UNIQUE" }],
  },

  tutores: {
    nombre: "tutores",
    descripcion: "Información de padres o tutores de estudiantes",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del tutor", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Referencia al usuario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      {
        nombre: "relacion",
        tipo: "VARCHAR(50)",
        descripcion: "Relación con el estudiante (padre, madre, tutor legal)",
      },
      { nombre: "telefono", tipo: "VARCHAR(20)", descripcion: "Teléfono de contacto" },
      { nombre: "direccion", tipo: "TEXT", descripcion: "Dirección del tutor" },
    ],
    indices: [{ nombre: "idx_tutores_usuario", campos: ["usuario_id"], tipo: "UNIQUE" }],
  },

  cursos: {
    nombre: "cursos",
    descripcion: "Información de cursos académicos",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del curso", esPrimario: true },
      { nombre: "nombre", tipo: "VARCHAR(100)", descripcion: "Nombre del curso" },
      { nombre: "descripcion", tipo: "TEXT", descripcion: "Descripción del curso" },
      { nombre: "grado", tipo: "VARCHAR(50)", descripcion: "Grado al que pertenece el curso" },
      { nombre: "año_academico", tipo: "VARCHAR(20)", descripcion: "Año académico del curso" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado del curso",
        valores: ["activo", "inactivo", "finalizado"],
      },
      {
        nombre: "profesor_id",
        tipo: "UUID",
        descripcion: "Profesor principal",
        esForaneo: true,
        referencia: "profesores(id)",
      },
    ],
    indices: [
      { nombre: "idx_cursos_profesor", campos: ["profesor_id"], tipo: "BTREE" },
      { nombre: "idx_cursos_grado_año", campos: ["grado", "año_academico"], tipo: "BTREE" },
    ],
  },

  inscripciones: {
    nombre: "inscripciones",
    descripcion: "Relación entre estudiantes y cursos",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la inscripción", esPrimario: true },
      {
        nombre: "estudiante_id",
        tipo: "UUID",
        descripcion: "Referencia al estudiante",
        esForaneo: true,
        referencia: "estudiantes(id)",
      },
      {
        nombre: "curso_id",
        tipo: "UUID",
        descripcion: "Referencia al curso",
        esForaneo: true,
        referencia: "cursos(id)",
      },
      { nombre: "fecha_inscripcion", tipo: "DATE", descripcion: "Fecha de inscripción" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado de la inscripción",
        valores: ["activa", "finalizada", "cancelada"],
      },
      {
        nombre: "calificacion_final",
        tipo: "DECIMAL(4,2)",
        descripcion: "Calificación final del estudiante en el curso",
      },
    ],
    indices: [
      { nombre: "idx_inscripciones_estudiante_curso", campos: ["estudiante_id", "curso_id"], tipo: "UNIQUE" },
      { nombre: "idx_inscripciones_curso", campos: ["curso_id"], tipo: "BTREE" },
    ],
  },

  asistencias: {
    nombre: "asistencias",
    descripcion: "Registro de asistencias de estudiantes",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la asistencia", esPrimario: true },
      {
        nombre: "estudiante_id",
        tipo: "UUID",
        descripcion: "Referencia al estudiante",
        esForaneo: true,
        referencia: "estudiantes(id)",
      },
      {
        nombre: "curso_id",
        tipo: "UUID",
        descripcion: "Referencia al curso",
        esForaneo: true,
        referencia: "cursos(id)",
      },
      { nombre: "fecha", tipo: "DATE", descripcion: "Fecha de la asistencia" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado de asistencia",
        valores: ["presente", "ausente", "tardanza", "justificada"],
      },
      { nombre: "observaciones", tipo: "TEXT", descripcion: "Observaciones sobre la asistencia" },
    ],
    indices: [
      {
        nombre: "idx_asistencias_estudiante_curso_fecha",
        campos: ["estudiante_id", "curso_id", "fecha"],
        tipo: "UNIQUE",
      },
      { nombre: "idx_asistencias_fecha", campos: ["fecha"], tipo: "BTREE" },
    ],
  },

  calificaciones: {
    nombre: "calificaciones",
    descripcion: "Calificaciones de estudiantes por actividad",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la calificación", esPrimario: true },
      {
        nombre: "estudiante_id",
        tipo: "UUID",
        descripcion: "Referencia al estudiante",
        esForaneo: true,
        referencia: "estudiantes(id)",
      },
      {
        nombre: "curso_id",
        tipo: "UUID",
        descripcion: "Referencia al curso",
        esForaneo: true,
        referencia: "cursos(id)",
      },
      {
        nombre: "actividad_id",
        tipo: "UUID",
        descripcion: "Referencia a la actividad",
        esForaneo: true,
        referencia: "actividades(id)",
      },
      { nombre: "valor", tipo: "DECIMAL(4,2)", descripcion: "Valor de la calificación" },
      { nombre: "fecha_calificacion", tipo: "DATE", descripcion: "Fecha de la calificación" },
      { nombre: "comentarios", tipo: "TEXT", descripcion: "Comentarios sobre la calificación" },
    ],
    indices: [
      { nombre: "idx_calificaciones_estudiante_actividad", campos: ["estudiante_id", "actividad_id"], tipo: "UNIQUE" },
      { nombre: "idx_calificaciones_curso", campos: ["curso_id"], tipo: "BTREE" },
    ],
  },

  actividades: {
    nombre: "actividades",
    descripcion: "Actividades académicas (tareas, exámenes, proyectos)",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la actividad", esPrimario: true },
      {
        nombre: "curso_id",
        tipo: "UUID",
        descripcion: "Referencia al curso",
        esForaneo: true,
        referencia: "cursos(id)",
      },
      { nombre: "titulo", tipo: "VARCHAR(100)", descripcion: "Título de la actividad" },
      { nombre: "descripcion", tipo: "TEXT", descripcion: "Descripción de la actividad" },
      {
        nombre: "tipo",
        tipo: "ENUM",
        descripcion: "Tipo de actividad",
        valores: ["tarea", "examen", "proyecto", "participacion"],
      },
      { nombre: "fecha_asignacion", tipo: "DATE", descripcion: "Fecha de asignación" },
      { nombre: "fecha_entrega", tipo: "DATE", descripcion: "Fecha límite de entrega" },
      {
        nombre: "ponderacion",
        tipo: "DECIMAL(5,2)",
        descripcion: "Ponderación de la actividad en la calificación final",
      },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado de la actividad",
        valores: ["pendiente", "activa", "finalizada"],
      },
    ],
    indices: [
      { nombre: "idx_actividades_curso", campos: ["curso_id"], tipo: "BTREE" },
      { nombre: "idx_actividades_fecha_entrega", campos: ["fecha_entrega"], tipo: "BTREE" },
    ],
  },

  entregas: {
    nombre: "entregas",
    descripcion: "Entregas de actividades por estudiantes",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la entrega", esPrimario: true },
      {
        nombre: "actividad_id",
        tipo: "UUID",
        descripcion: "Referencia a la actividad",
        esForaneo: true,
        referencia: "actividades(id)",
      },
      {
        nombre: "estudiante_id",
        tipo: "UUID",
        descripcion: "Referencia al estudiante",
        esForaneo: true,
        referencia: "estudiantes(id)",
      },
      { nombre: "fecha_entrega", tipo: "TIMESTAMP", descripcion: "Fecha y hora de la entrega" },
      { nombre: "contenido", tipo: "TEXT", descripcion: "Contenido textual de la entrega" },
      { nombre: "archivos", tipo: "JSON", descripcion: "URLs de archivos adjuntos" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado de la entrega",
        valores: ["borrador", "entregada", "calificada", "retrasada"],
      },
      { nombre: "comentarios_estudiante", tipo: "TEXT", descripcion: "Comentarios del estudiante" },
    ],
    indices: [
      { nombre: "idx_entregas_actividad_estudiante", campos: ["actividad_id", "estudiante_id"], tipo: "UNIQUE" },
      { nombre: "idx_entregas_fecha", campos: ["fecha_entrega"], tipo: "BTREE" },
    ],
  },

  eventos: {
    nombre: "eventos",
    descripcion: "Eventos académicos y extracurriculares",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del evento", esPrimario: true },
      { nombre: "titulo", tipo: "VARCHAR(100)", descripcion: "Título del evento" },
      { nombre: "descripcion", tipo: "TEXT", descripcion: "Descripción del evento" },
      { nombre: "fecha_inicio", tipo: "TIMESTAMP", descripcion: "Fecha y hora de inicio" },
      { nombre: "fecha_fin", tipo: "TIMESTAMP", descripcion: "Fecha y hora de finalización" },
      { nombre: "ubicacion", tipo: "VARCHAR(255)", descripcion: "Ubicación del evento" },
      {
        nombre: "tipo",
        tipo: "ENUM",
        descripcion: "Tipo de evento",
        valores: ["academico", "deportivo", "cultural", "administrativo"],
      },
      {
        nombre: "creador_id",
        tipo: "UUID",
        descripcion: "Usuario que creó el evento",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado del evento",
        valores: ["programado", "en_curso", "finalizado", "cancelado"],
      },
    ],
    indices: [
      { nombre: "idx_eventos_fecha", campos: ["fecha_inicio", "fecha_fin"], tipo: "BTREE" },
      { nombre: "idx_eventos_tipo", campos: ["tipo"], tipo: "BTREE" },
    ],
  },

  participantes_evento: {
    nombre: "participantes_evento",
    descripcion: "Relación entre usuarios y eventos",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la participación", esPrimario: true },
      {
        nombre: "evento_id",
        tipo: "UUID",
        descripcion: "Referencia al evento",
        esForaneo: true,
        referencia: "eventos(id)",
      },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Referencia al usuario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado de participación",
        valores: ["invitado", "confirmado", "rechazado", "asistio"],
      },
      { nombre: "fecha_respuesta", tipo: "TIMESTAMP", descripcion: "Fecha de respuesta a la invitación" },
    ],
    indices: [{ nombre: "idx_participantes_evento_usuario", campos: ["evento_id", "usuario_id"], tipo: "UNIQUE" }],
  },

  mensajes: {
    nombre: "mensajes",
    descripcion: "Mensajes entre usuarios",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del mensaje", esPrimario: true },
      {
        nombre: "remitente_id",
        tipo: "UUID",
        descripcion: "Usuario que envía el mensaje",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      {
        nombre: "destinatario_id",
        tipo: "UUID",
        descripcion: "Usuario que recibe el mensaje",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "asunto", tipo: "VARCHAR(255)", descripcion: "Asunto del mensaje" },
      { nombre: "contenido", tipo: "TEXT", descripcion: "Contenido del mensaje" },
      { nombre: "fecha_envio", tipo: "TIMESTAMP", descripcion: "Fecha y hora de envío" },
      { nombre: "leido", tipo: "BOOLEAN", descripcion: "Indica si el mensaje ha sido leído" },
      { nombre: "fecha_lectura", tipo: "TIMESTAMP", descripcion: "Fecha y hora de lectura" },
      { nombre: "archivos", tipo: "JSON", descripcion: "URLs de archivos adjuntos" },
    ],
    indices: [
      { nombre: "idx_mensajes_remitente", campos: ["remitente_id"], tipo: "BTREE" },
      { nombre: "idx_mensajes_destinatario", campos: ["destinatario_id"], tipo: "BTREE" },
      { nombre: "idx_mensajes_fecha", campos: ["fecha_envio"], tipo: "BTREE" },
    ],
  },

  notificaciones: {
    nombre: "notificaciones",
    descripcion: "Notificaciones del sistema para usuarios",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la notificación", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Usuario destinatario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "tipo", tipo: "VARCHAR(50)", descripcion: "Tipo de notificación" },
      { nombre: "titulo", tipo: "VARCHAR(255)", descripcion: "Título de la notificación" },
      { nombre: "contenido", tipo: "TEXT", descripcion: "Contenido de la notificación" },
      { nombre: "fecha_creacion", tipo: "TIMESTAMP", descripcion: "Fecha y hora de creación" },
      { nombre: "leida", tipo: "BOOLEAN", descripcion: "Indica si la notificación ha sido leída" },
      { nombre: "fecha_lectura", tipo: "TIMESTAMP", descripcion: "Fecha y hora de lectura" },
      { nombre: "enlace", tipo: "VARCHAR(255)", descripcion: "Enlace relacionado con la notificación" },
    ],
    indices: [
      { nombre: "idx_notificaciones_usuario", campos: ["usuario_id"], tipo: "BTREE" },
      { nombre: "idx_notificaciones_fecha", campos: ["fecha_creacion"], tipo: "BTREE" },
    ],
  },

  recursos: {
    nombre: "recursos",
    descripcion: "Recursos educativos compartidos",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del recurso", esPrimario: true },
      { nombre: "titulo", tipo: "VARCHAR(255)", descripcion: "Título del recurso" },
      { nombre: "descripcion", tipo: "TEXT", descripcion: "Descripción del recurso" },
      {
        nombre: "tipo",
        tipo: "ENUM",
        descripcion: "Tipo de recurso",
        valores: ["documento", "video", "audio", "enlace", "presentacion"],
      },
      { nombre: "url", tipo: "VARCHAR(255)", descripcion: "URL del recurso" },
      {
        nombre: "creador_id",
        tipo: "UUID",
        descripcion: "Usuario que creó el recurso",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "fecha_creacion", tipo: "TIMESTAMP", descripcion: "Fecha y hora de creación" },
      {
        nombre: "estado",
        tipo: "ENUM",
        descripcion: "Estado del recurso",
        valores: ["activo", "inactivo", "archivado"],
      },
      { nombre: "etiquetas", tipo: "JSON", descripcion: "Etiquetas para categorizar el recurso" },
    ],
    indices: [
      { nombre: "idx_recursos_creador", campos: ["creador_id"], tipo: "BTREE" },
      { nombre: "idx_recursos_tipo", campos: ["tipo"], tipo: "BTREE" },
    ],
  },

  recursos_curso: {
    nombre: "recursos_curso",
    descripcion: "Relación entre recursos y cursos",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la relación", esPrimario: true },
      {
        nombre: "recurso_id",
        tipo: "UUID",
        descripcion: "Referencia al recurso",
        esForaneo: true,
        referencia: "recursos(id)",
      },
      {
        nombre: "curso_id",
        tipo: "UUID",
        descripcion: "Referencia al curso",
        esForaneo: true,
        referencia: "cursos(id)",
      },
      { nombre: "fecha_asignacion", tipo: "TIMESTAMP", descripcion: "Fecha y hora de asignación" },
    ],
    indices: [{ nombre: "idx_recursos_curso", campos: ["recurso_id", "curso_id"], tipo: "UNIQUE" }],
  },

  diario_emociones: {
    nombre: "diario_emociones",
    descripcion: "Registro de emociones de los estudiantes",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del registro", esPrimario: true },
      {
        nombre: "estudiante_id",
        tipo: "UUID",
        descripcion: "Referencia al estudiante",
        esForaneo: true,
        referencia: "estudiantes(id)",
      },
      { nombre: "fecha", tipo: "DATE", descripcion: "Fecha del registro" },
      { nombre: "titulo", tipo: "VARCHAR(255)", descripcion: "Título de la entrada" },
      { nombre: "contenido", tipo: "TEXT", descripcion: "Descripción de la experiencia emocional" },
      {
        nombre: "sentimiento",
        tipo: "ENUM",
        descripcion: "Sentimiento principal",
        valores: ["bien", "neutral", "mal"],
      },
      { nombre: "intensidad", tipo: "INTEGER", descripcion: "Intensidad del sentimiento (1-10)" },
      { nombre: "etiquetas", tipo: "JSON", descripcion: "Etiquetas emocionales adicionales" },
      {
        nombre: "privacidad",
        tipo: "ENUM",
        descripcion: "Nivel de privacidad",
        valores: ["privado", "profesores", "todos"],
      },
    ],
    indices: [
      { nombre: "idx_diario_estudiante_fecha", campos: ["estudiante_id", "fecha"], tipo: "UNIQUE" },
      { nombre: "idx_diario_sentimiento", campos: ["sentimiento"], tipo: "BTREE" },
    ],
  },

  sugerencias_ia: {
    nombre: "sugerencias_ia",
    descripcion: "Sugerencias generadas por IA para usuarios",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la sugerencia", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Usuario destinatario",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      {
        nombre: "tipo_usuario",
        tipo: "ENUM",
        descripcion: "Tipo de usuario al que va dirigida",
        valores: ["estudiante", "profesor", "administrador"],
      },
      { nombre: "titulo", tipo: "VARCHAR(255)", descripcion: "Título de la sugerencia" },
      { nombre: "descripcion", tipo: "TEXT", descripcion: "Descripción detallada de la sugerencia" },
      { nombre: "categoria", tipo: "VARCHAR(100)", descripcion: "Categoría de la sugerencia" },
      {
        nombre: "prioridad",
        tipo: "ENUM",
        descripcion: "Prioridad de la sugerencia",
        valores: ["baja", "media", "alta"],
      },
      { nombre: "fecha_generacion", tipo: "TIMESTAMP", descripcion: "Fecha y hora de generación" },
      { nombre: "accion_recomendada", tipo: "TEXT", descripcion: "Acción recomendada para el usuario" },
      { nombre: "enlace_accion", tipo: "VARCHAR(255)", descripcion: "Enlace para realizar la acción recomendada" },
      { nombre: "vista", tipo: "BOOLEAN", descripcion: "Indica si la sugerencia ha sido vista" },
      { nombre: "implementada", tipo: "BOOLEAN", descripcion: "Indica si la sugerencia ha sido implementada" },
    ],
    indices: [
      { nombre: "idx_sugerencias_usuario", campos: ["usuario_id"], tipo: "BTREE" },
      { nombre: "idx_sugerencias_tipo_prioridad", campos: ["tipo_usuario", "prioridad"], tipo: "BTREE" },
    ],
  },

  sesiones: {
    nombre: "sesiones",
    descripcion: "Sesiones de usuario en el sistema",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único de la sesión", esPrimario: true },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Usuario de la sesión",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "token", tipo: "VARCHAR(255)", descripcion: "Token de sesión", esUnico: true },
      { nombre: "ip", tipo: "VARCHAR(45)", descripcion: "Dirección IP del cliente" },
      { nombre: "user_agent", tipo: "TEXT", descripcion: "User agent del cliente" },
      { nombre: "fecha_inicio", tipo: "TIMESTAMP", descripcion: "Fecha y hora de inicio de sesión" },
      { nombre: "fecha_expiracion", tipo: "TIMESTAMP", descripcion: "Fecha y hora de expiración" },
      { nombre: "fecha_ultimo_acceso", tipo: "TIMESTAMP", descripcion: "Fecha y hora del último acceso" },
      { nombre: "activa", tipo: "BOOLEAN", descripcion: "Indica si la sesión está activa" },
    ],
    indices: [
      { nombre: "idx_sesiones_token", campos: ["token"], tipo: "UNIQUE" },
      { nombre: "idx_sesiones_usuario", campos: ["usuario_id"], tipo: "BTREE" },
      { nombre: "idx_sesiones_expiracion", campos: ["fecha_expiracion"], tipo: "BTREE" },
    ],
  },

  logs_sistema: {
    nombre: "logs_sistema",
    descripcion: "Registros de actividad del sistema",
    campos: [
      { nombre: "id", tipo: "UUID", descripcion: "Identificador único del log", esPrimario: true },
      { nombre: "fecha", tipo: "TIMESTAMP", descripcion: "Fecha y hora del evento" },
      { nombre: "nivel", tipo: "ENUM", descripcion: "Nivel de log", valores: ["info", "warning", "error", "critical"] },
      { nombre: "categoria", tipo: "VARCHAR(100)", descripcion: "Categoría del log" },
      { nombre: "mensaje", tipo: "TEXT", descripcion: "Mensaje del log" },
      {
        nombre: "usuario_id",
        tipo: "UUID",
        descripcion: "Usuario relacionado (si aplica)",
        esForaneo: true,
        referencia: "usuarios(id)",
      },
      { nombre: "ip", tipo: "VARCHAR(45)", descripcion: "Dirección IP relacionada" },
      { nombre: "detalles", tipo: "JSON", descripcion: "Detalles adicionales del evento" },
    ],
    indices: [
      { nombre: "idx_logs_fecha", campos: ["fecha"], tipo: "BTREE" },
      { nombre: "idx_logs_nivel", campos: ["nivel"], tipo: "BTREE" },
      { nombre: "idx_logs_usuario", campos: ["usuario_id"], tipo: "BTREE" },
    ],
  },
}

// Mostrar información de tablas
console.log("### Tablas Principales\n")
Object.keys(tablas).forEach((key) => {
  const tabla = tablas[key]
  console.log(`#### Tabla: ${tabla.nombre}`)
  console.log(`Descripción: ${tabla.descripcion}\n`)

  console.log("**Campos:**")
  tabla.campos.forEach((campo) => {
    let descripcionCampo = `- **${campo.nombre}** (${campo.tipo}): ${campo.descripcion}`
    if (campo.esPrimario) descripcionCampo += " [Clave Primaria]"
    if (campo.esForaneo) descripcionCampo += ` [Clave Foránea → ${campo.referencia}]`
    if (campo.esUnico) descripcionCampo += " [Único]"
    console.log(descripcionCampo)
  })

  console.log("\n**Índices:**")
  tabla.indices.forEach((indice) => {
    console.log(`- **${indice.nombre}**: Campos: [${indice.campos.join(", ")}], Tipo: ${indice.tipo}`)
  })
  console.log("\n")
})

console.log("\n## 2. CONFIGURACIÓN DE SEGURIDAD\n")

const configuracionSeguridad = {
  autenticacion: {
    metodos: [
      { nombre: "JWT (JSON Web Tokens)", descripcion: "Tokens firmados para autenticación sin estado" },
      {
        nombre: "Autenticación de dos factores (2FA)",
        descripcion: "Capa adicional de seguridad mediante códigos temporales",
      },
      { nombre: "OAuth 2.0", descripcion: "Para integración con proveedores externos (Google, Microsoft)" },
    ],
    politicasContraseñas: [
      "Mínimo 10 caracteres",
      "Combinación de letras mayúsculas, minúsculas, números y símbolos",
      "Cambio obligatorio cada 90 días",
      "No reutilización de las últimas 5 contraseñas",
      "Bloqueo temporal después de 5 intentos fallidos",
    ],
    sesiones: [
      "Expiración de sesiones después de 30 minutos de inactividad",
      "Invalidación de sesiones al cambiar contraseña",
      "Límite de 5 sesiones activas simultáneas por usuario",
    ],
  },

  autorizacion: {
    modelo: "RBAC (Control de Acceso Basado en Roles) con ABAC (Control de Acceso Basado en Atributos)",
    roles: [
      { nombre: "Estudiante", permisos: ["lectura básica", "escritura limitada"] },
      { nombre: "Profesor", permisos: ["lectura avanzada", "escritura moderada", "gestión de cursos"] },
      { nombre: "Administrador", permisos: ["lectura completa", "escritura completa", "gestión de usuarios"] },
      { nombre: "SuperAdmin", permisos: ["acceso total", "configuración del sistema"] },
    ],
    granularidad: "Permisos a nivel de recurso y campo",
  },

  proteccionDatos: {
    encriptacion: [
      { tipo: "En reposo", metodo: "AES-256 para datos sensibles almacenados" },
      { tipo: "En tránsito", metodo: "TLS 1.3 para todas las comunicaciones" },
    ],
    anonimizacion: "Datos personales anonimizados para análisis y reportes",
    backups: "Copias de seguridad encriptadas con rotación de claves",
  },

  auditoria: {
    eventos: [
      "Inicios de sesión (exitosos y fallidos)",
      "Cambios en datos sensibles",
      "Acciones administrativas",
      "Accesos a información confidencial",
    ],
    retencion: "Logs de auditoría conservados por 1 año",
    monitoreo: "Sistema de detección de anomalías en tiempo real",
  },

  cumplimientoNormativo: [
    "GDPR/RGPD para protección de datos personales",
    "FERPA para información educativa en EE.UU.",
    "COPPA para protección de menores",
    "Regulaciones locales de protección de datos educativos",
  ],
}

// Mostrar información de seguridad
console.log("### Autenticación\n")
configuracionSeguridad.autenticacion.metodos.forEach((metodo) => {
  console.log(`- **${metodo.nombre}**: ${metodo.descripcion}`)
})

console.log("\n**Políticas de Contraseñas:**")
configuracionSeguridad.autenticacion.politicasContraseñas.forEach((politica) => {
  console.log(`- ${politica}`)
})

console.log("\n**Gestión de Sesiones:**")
configuracionSeguridad.autenticacion.sesiones.forEach((politica) => {
  console.log(`- ${politica}`)
})

console.log("\n### Autorización\n")
console.log(`**Modelo**: ${configuracionSeguridad.autorizacion.modelo}\n`)
console.log("**Roles y Permisos:**")
configuracionSeguridad.autorizacion.roles.forEach((rol) => {
  console.log(`- **${rol.nombre}**: ${rol.permisos.join(", ")}`)
})
console.log(`\n**Granularidad**: ${configuracionSeguridad.autorizacion.granularidad}`)

console.log("\n### Protección de Datos\n")
console.log("**Encriptación:**")
configuracionSeguridad.proteccionDatos.encriptacion.forEach((tipo) => {
  console.log(`- **${tipo.tipo}**: ${tipo.metodo}`)
})
console.log(`\n**Anonimización**: ${configuracionSeguridad.proteccionDatos.anonimizacion}`)
console.log(`\n**Backups**: ${configuracionSeguridad.proteccionDatos.backups}`)

console.log("\n### Auditoría\n")
console.log("**Eventos Auditados:**")
configuracionSeguridad.auditoria.eventos.forEach((evento) => {
  console.log(`- ${evento}`)
})
console.log(`\n**Retención**: ${configuracionSeguridad.auditoria.retencion}`)
console.log(`\n**Monitoreo**: ${configuracionSeguridad.auditoria.monitoreo}`)

console.log("\n### Cumplimiento Normativo\n")
configuracionSeguridad.cumplimientoNormativo.forEach((norma) => {
  console.log(`- ${norma}`)
})

console.log("\n## 3. CONFIGURACIÓN DE INFRAESTRUCTURA\n")

const configuracionInfraestructura = {
  servidores: {
    aplicacion: {
      tipo: "Contenedores Docker orquestados con Kubernetes",
      escalado: "Horizontal automático basado en carga",
      regiones: ["Principal: US East", "Secundaria: EU West", "Terciaria: Asia Pacific"],
    },
    baseDatos: {
      principal: {
        tipo: "PostgreSQL 15",
        configuracion: "Alta disponibilidad con replicación síncrona",
        recursos: "16 vCPUs, 64GB RAM, SSD NVMe",
      },
      analitica: {
        tipo: "PostgreSQL con extensión TimescaleDB",
        uso: "Datos históricos y análisis de series temporales",
      },
      cache: {
        tipo: "Redis 7",
        configuracion: "Cluster con persistencia",
        uso: "Caché de sesiones, resultados de consultas frecuentes",
      },
    },
    almacenamiento: {
      tipo: "Object Storage compatible con S3",
      usos: ["Archivos de usuarios", "Recursos educativos", "Backups"],
    },
  },

  redes: {
    arquitectura: "Redes privadas virtuales (VPC) por entorno",
    segmentacion: [
      { nombre: "Subred pública", uso: "Load balancers, API Gateway" },
      { nombre: "Subred de aplicación", uso: "Servidores de aplicación" },
      { nombre: "Subred de datos", uso: "Bases de datos y caché" },
    ],
    firewalls: [
      "WAF (Web Application Firewall) para protección de API",
      "Reglas de firewall por subred",
      "Listas blancas de IPs para acceso administrativo",
    ],
  },

  puertos: [
    { numero: 443, servicio: "HTTPS (API y aplicación web)", acceso: "Público" },
    { numero: 80, servicio: "HTTP (redirección a HTTPS)", acceso: "Público" },
    { numero: 5432, servicio: "PostgreSQL", acceso: "Privado (solo subred de aplicación)" },
    { numero: 6379, servicio: "Redis", acceso: "Privado (solo subred de aplicación)" },
    { numero: 22, servicio: "SSH", acceso: "Privado (solo VPN administrativa)" },
  ],

  entornos: [
    { nombre: "Desarrollo", proposito: "Desarrollo activo y pruebas de integración" },
    { nombre: "Staging", proposito: "Pruebas de aceptación y validación pre-producción" },
    { nombre: "Producción", proposito: "Entorno de producción para usuarios finales" },
  ],

  monitoreo: {
    metricas: {
      herramientas: ["Prometheus", "Grafana"],
      metricas_clave: [
        "Latencia de API (p50, p95, p99)",
        "Tasa de errores",
        "Utilización de recursos (CPU, memoria, disco, red)",
        "Tiempos de respuesta de base de datos",
      ],
    },
    logs: {
      herramientas: ["Elasticsearch", "Kibana", "Fluentd"],
      retencion: "30 días para logs operativos, 1 año para logs de auditoría",
    },
    alertas: {
      herramientas: ["AlertManager", "PagerDuty"],
      politicas: [
        "Alertas críticas: notificación inmediata 24/7",
        "Alertas importantes: notificación en horario laboral",
        "Alertas informativas: resumen diario",
      ],
    },
  },

  respaldos: {
    estrategia: "3-2-1 (3 copias, 2 medios diferentes, 1 fuera del sitio)",
    frecuencia: [
      { tipo: "Completo", frecuencia: "Semanal" },
      { tipo: "Incremental", frecuencia: "Diario" },
      { tipo: "Transaccional", frecuencia: "Cada 15 minutos" },
    ],
    retencion: ["Diarios: 7 días", "Semanales: 1 mes", "Mensuales: 1 año"],
    pruebas: "Pruebas de restauración mensuales",
  },

  recuperacionDesastres: {
    rto: "Objetivo de Tiempo de Recuperación: 1 hora",
    rpo: "Objetivo de Punto de Recuperación: 15 minutos",
    estrategia: "Replicación activa-pasiva entre regiones",
    pruebas: "Simulacros de desastre trimestrales",
  },
}

// Mostrar información de infraestructura
console.log("### Servidores\n")
console.log("**Servidores de Aplicación:**")
console.log(`- **Tipo**: ${configuracionInfraestructura.servidores.aplicacion.tipo}`)
console.log(`- **Escalado**: ${configuracionInfraestructura.servidores.aplicacion.escalado}`)
console.log(`- **Regiones**: ${configuracionInfraestructura.servidores.aplicacion.regiones.join(", ")}`)

console.log("\n**Base de Datos:**")
console.log(`- **Principal**: ${configuracionInfraestructura.servidores.baseDatos.principal.tipo}`)
console.log(`  - Configuración: ${configuracionInfraestructura.servidores.baseDatos.principal.configuracion}`)
console.log(`  - Recursos: ${configuracionInfraestructura.servidores.baseDatos.principal.recursos}`)
console.log(`- **Analítica**: ${configuracionInfraestructura.servidores.baseDatos.analitica.tipo}`)
console.log(`  - Uso: ${configuracionInfraestructura.servidores.baseDatos.analitica.uso}`)
console.log(`- **Caché**: ${configuracionInfraestructura.servidores.baseDatos.cache.tipo}`)
console.log(`  - Configuración: ${configuracionInfraestructura.servidores.baseDatos.cache.configuracion}`)
console.log(`  - Uso: ${configuracionInfraestructura.servidores.baseDatos.cache.uso}`)

console.log("\n**Almacenamiento:**")
console.log(`- **Tipo**: ${configuracionInfraestructura.servidores.almacenamiento.tipo}`)
console.log(`- **Usos**: ${configuracionInfraestructura.servidores.almacenamiento.usos.join(", ")}`)

console.log("\n### Redes\n")
console.log(`**Arquitectura**: ${configuracionInfraestructura.redes.arquitectura}\n`)
console.log("**Segmentación:**")
configuracionInfraestructura.redes.segmentacion.forEach((segmento) => {
  console.log(`- **${segmento.nombre}**: ${segmento.uso}`)
})

console.log("\n**Firewalls:**")
configuracionInfraestructura.redes.firewalls.forEach((firewall) => {
  console.log(`- ${firewall}`)
})

console.log("\n### Puertos\n")
console.log("| Puerto | Servicio | Acceso |")
console.log("|--------|----------|--------|")
configuracionInfraestructura.puertos.forEach((puerto) => {
  console.log(`| ${puerto.numero} | ${puerto.servicio} | ${puerto.acceso} |`)
})

console.log("\n### Entornos\n")
configuracionInfraestructura.entornos.forEach((entorno) => {
  console.log(`- **${entorno.nombre}**: ${entorno.proposito}`)
})

console.log("\n### Monitoreo\n")
console.log("**Métricas:**")
console.log(`- **Herramientas**: ${configuracionInfraestructura.monitoreo.metricas.herramientas.join(", ")}`)
console.log("- **Métricas Clave**:")
configuracionInfraestructura.monitoreo.metricas.metricas_clave.forEach((metrica) => {
  console.log(`  - ${metrica}`)
})

console.log("\n**Logs:**")
console.log(`- **Herramientas**: ${configuracionInfraestructura.monitoreo.logs.herramientas.join(", ")}`)
console.log(`- **Retención**: ${configuracionInfraestructura.monitoreo.logs.retencion}`)

console.log("\n**Alertas:**")
console.log(`- **Herramientas**: ${configuracionInfraestructura.monitoreo.alertas.herramientas.join(", ")}`)
console.log("- **Políticas**:")
configuracionInfraestructura.monitoreo.alertas.politicas.forEach((politica) => {
  console.log(`  - ${politica}`)
})

console.log("\n### Respaldos\n")
console.log(`**Estrategia**: ${configuracionInfraestructura.respaldos.estrategia}\n`)
console.log("**Frecuencia:**")
configuracionInfraestructura.respaldos.frecuencia.forEach((backup) => {
  console.log(`- **${backup.tipo}**: ${backup.frecuencia}`)
})

console.log("\n**Retención:**")
configuracionInfraestructura.respaldos.retencion.forEach((politica) => {
  console.log(`- ${politica}`)
})

console.log(`\n**Pruebas**: ${configuracionInfraestructura.respaldos.pruebas}`)

console.log("\n### Recuperación ante Desastres\n")
console.log(`- **RTO**: ${configuracionInfraestructura.recuperacionDesastres.rto}`)
console.log(`- **RPO**: ${configuracionInfraestructura.recuperacionDesastres.rpo}`)
console.log(`- **Estrategia**: ${configuracionInfraestructura.recuperacionDesastres.estrategia}`)
console.log(`- **Pruebas**: ${configuracionInfraestructura.recuperacionDesastres.pruebas}`)

console.log("\n## 4. OPTIMIZACIÓN Y RENDIMIENTO\n")

const optimizacionRendimiento = {
  indices: [
    "Índices B-tree para búsquedas por igualdad y rangos",
    "Índices GIN para búsquedas en campos JSON y arrays",
    "Índices parciales para subconjuntos de datos frecuentemente consultados",
    "Índices compuestos para consultas con múltiples condiciones",
  ],

  particionamiento: [
    "Particionamiento por rango en tablas de logs y eventos (por fecha)",
    "Particionamiento por hash en tablas muy grandes (usuarios, mensajes)",
    "Estrategia de purga automática para datos históricos",
  ],

  caching: [
    "Caché de resultados de consultas frecuentes en Redis",
    "Caché de sesiones de usuario",
    "Caché de contenido estático con CDN",
    "Estrategia de invalidación de caché basada en eventos",
  ],

  consultas: [
    "Optimización de consultas con EXPLAIN ANALYZE",
    "Uso de vistas materializadas para reportes complejos",
    "Paginación eficiente con cursores para grandes conjuntos de datos",
    "Consultas asíncronas para operaciones de larga duración",
  ],

  escalabilidad: [
    "Diseño stateless para facilitar escalado horizontal",
    "Colas de mensajes para operaciones asíncronas",
    "Microservicios para componentes con diferentes patrones de escalado",
    "Sharding para distribución de carga en bases de datos muy grandes",
  ],
}

// Mostrar información de optimización
console.log("### Estrategias de Indexación\n")
optimizacionRendimiento.indices.forEach((estrategia) => {
  console.log(`- ${estrategia}`)
})

console.log("\n### Particionamiento de Datos\n")
optimizacionRendimiento.particionamiento.forEach((estrategia) => {
  console.log(`- ${estrategia}`)
})

console.log("\n### Estrategias de Caché\n")
optimizacionRendimiento.caching.forEach((estrategia) => {
  console.log(`- ${estrategia}`)
})

console.log("\n### Optimización de Consultas\n")
optimizacionRendimiento.consultas.forEach((estrategia) => {
  console.log(`- ${estrategia}`)
})

console.log("\n### Estrategias de Escalabilidad\n")
optimizacionRendimiento.escalabilidad.forEach((estrategia) => {
  console.log(`- ${estrategia}`)
})

console.log("\n## 5. RECOMENDACIONES ADICIONALES\n")

const recomendaciones = [
  "**Implementar una estrategia de migración incremental** para minimizar el impacto en usuarios durante actualizaciones de esquema.",
  "**Utilizar un ORM (Object-Relational Mapping)** como Prisma o TypeORM para facilitar el desarrollo y mantener la consistencia.",
  "**Implementar un sistema de versionado de API** para permitir actualizaciones sin romper compatibilidad con clientes existentes.",
  "**Considerar una estrategia de datos polimórficos** para entidades que comparten características pero tienen comportamientos específicos.",
  "**Implementar un sistema de auditoría de cambios** a nivel de aplicación para rastrear modificaciones en datos críticos.",
  "**Utilizar transacciones para operaciones complejas** que involucren múltiples tablas para mantener la integridad de los datos.",
  "**Implementar una estrategia de soft delete** para datos importantes, permitiendo recuperación en caso de eliminaciones accidentales.",
  "**Considerar el uso de PostgreSQL LISTEN/NOTIFY** para implementar notificaciones en tiempo real de cambios en la base de datos.",
]

// Mostrar recomendaciones
recomendaciones.forEach((recomendacion) => {
  console.log(`- ${recomendacion}`)
})

console.log("\n## CONCLUSIÓN\n")
console.log(
  "Esta documentación proporciona una visión completa de la estructura de base de datos, configuración de seguridad, infraestructura y estrategias de optimización para la plataforma educativa. La implementación de estas recomendaciones garantizará un sistema robusto, seguro y escalable que podrá crecer con las necesidades de la institución educativa.",
)
console.log(
  "\nEs importante revisar y actualizar periódicamente esta documentación a medida que evolucionen los requisitos y se implementen nuevas funcionalidades en la plataforma.",
)

