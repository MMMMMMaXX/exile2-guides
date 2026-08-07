import type {
  InformationPageSlug,
  InformationPageCopy,
} from "./information-copy";

export const esFrJaInfoCopy: Record<
  "es" | "fr" | "ja",
  Record<InformationPageSlug, InformationPageCopy>
> = {
  es: {
    about: {
      description:
        "Aprende cómo Exile2 Guides se opera, investiga y publica de forma independiente como un recurso no oficial de guías de Path of Exile 2.",
      title: "Acerca de Exile2 Guides",
      sections: [
        {
          title: "Nuestra misión",
          paragraphs: [
            "Exile2 Guides es operado de forma independiente por un desarrollador como un recurso no oficial de guías de Path of Exile 2. El objetivo es organizar respuestas útiles y conscientes de los parches sin presentar resúmenes de investigación como experiencia personal de juego.",
            "El sitio es de solo lectura y de acceso gratuito. Los artículos se publican tras una investigación estructurada y controles de calidad automatizados, mostrando la incertidumbre y los límites de verificación en la página cuando es pertinente.",
          ],
        },
        {
          title: "Qué abarcamos",
          connectionLinks: [
            {
              description:
                "Configuraciones de nivelación, equipos de endgame, prioridades de equipo, rutas del árbol de pasivas y configuraciones de enlaces de gemas para cada clase.",
              href: "/en/builds/",
              label: "Builds",
            },
            {
              description:
                "Mecánicas de jefes, desglose por fases, tablas de botín, requisitos de resistencia y guías de estrategia paso a paso.",
              href: "/en/bosses/",
              label: "Jefes",
            },
            {
              description:
                "Bases de datos de objetos únicos, mecánicas de monedas, referencias de elaboración y explicaciones de niveles de afijos.",
              href: "/en/items/",
              label: "Objetos",
            },
            {
              description:
                "Desglose de gemas de habilidades activas, combinaciones de gemas de soporte, mecánicas de escalado y datos de progresión por nivel.",
              href: "/en/skills/",
              label: "Habilidades",
            },
            {
              description:
                "Análisis profundos de mecánicas, tutoriales para principiantes, respuestas a preguntas frecuentes y guías generales de progresión.",
              href: "/en/guides/",
              label: "Guías",
            },
          ],
        },
        {
          title: "Normas editoriales",
          paragraphs: [
            "Los artículos se investigan utilizando notas de parche oficiales, bases de datos actuales, guías comunitarias consolidadas, videos de jugabilidad y discusiones de jugadores. Las afirmaciones se enlazan a sus fuentes cuando es posible y se redactan con el contexto del parche correspondiente.",
            "El control de calidad automatizado verifica la estructura del contenido, los metadatos requeridos, los enlaces internos, el estado de publicación, la indexabilidad y la salida de compilación antes de publicar un artículo.",
            "Cuando una conclusión no ha sido probada personalmente en el juego, se presenta como verificada por la fuente en lugar de probada de primera mano. La incertidumbre sensible a la versión permanece visible en lugar de ocultarse tras un lenguaje seguro.",
          ],
        },
        {
          title: "Independencia",
          paragraphs: [
            "Exile2 Guides es un recurso independiente creado por fanáticos. No está afiliado, respaldado ni patrocinado por Grinding Gear Games ni por ninguna otra empresa.",
            "La publicación es mantenida por un operador, y el proceso de investigación no presenta pruebas de jugabilidad de primera mano como completadas cuando no se han realizado.",
          ],
        },
        {
          title: "Correcciones y comentarios",
          paragraphs: [
            "Las mecánicas del juego cambian con frecuencia, y ninguna guía es perfecta. Si encuentras un error fáctico, una mecánica desactualizada o una fuente faltante, comunícate con nosotros a través de nuestra página de Contacto o envíanos un correo directamente.",
            "Las correcciones y los informes de derechos de autor se revisan según el tiempo disponible. Los errores fácticos de alto impacto tienen prioridad, pero no se garantizan los tiempos de respuesta.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Contacta al operador independiente de Exile2 Guides sobre correcciones de contenido, informes de derechos de autor o comentarios generales.",
      title: "Contáctanos",
      sections: [
        {
          title: "Ponte en contacto",
          paragraphs: [
            "El único canal de contacto público es el correo electrónico: contact@stratlore.com. Revisamos las correcciones y los informes de derechos de autor según el tiempo disponible. Los errores fácticos de alto impacto tienen prioridad, pero no se garantizan los tiempos de respuesta.",
            "Este es un sitio estático de solo lectura sin formulario de contacto del lado del servidor. Utiliza el enlace de correo directo que aparece a continuación; no hay un botón de envío de mensajes que pueda descartar tu solicitud en silencio.",
          ],
          connectionLinks: [
            {
              description:
                "Abre tu cliente de correo para enviar una corrección, un informe de derechos de autor u otra nota.",
              href: "mailto:contact@stratlore.com",
              label: "contact@stratlore.com",
            },
          ],
        },
        {
          title: "Escenarios de contacto",
          issueCards: [
            {
              description:
                "Incluye la URL de la página, la afirmación específica que es incorrecta, la versión del juego o parche en la que realizaste la prueba, y una fuente confiable o pasos de reproducción claros.",
              title: "Corrección de contenido",
            },
            {
              description:
                "Proporciona la URL del recurso o de la página, una descripción del material protegido por derechos de autor, prueba de propiedad o autorización, y la acción específica que solicitas.",
              title: "Derechos de autor o atribución",
            },
            {
              description:
                "Indícanos qué área necesita atención —builds, jefes, objetos, habilidades o la experiencia general del sitio— junto con tu sugerencia detallada.",
              title: "Comentarios generales",
            },
          ],
        },
        {
          title: "Qué incluir",
          bullets: [
            "La URL exacta de la página donde aparece el problema, junto con una captura de pantalla o el texto citado si es posible.",
            "Una fuente confiable para la corrección —notas de parche oficiales, una entrada de base de datos actual o una prueba o informe comunitario claro.",
            "Detalles claros de reproducción para cualquier discrepancia de mecánicas, incluyendo la versión del juego y la configuración relevante si se conoce.",
            "Solo la información personal mínima necesaria para que podamos responder a tu consulta.",
          ],
        },
        {
          title: "Política de revisión",
          paragraphs: [
            "Revisamos las correcciones y los informes de derechos de autor según el tiempo disponible. Los errores fácticos de alto impacto tienen prioridad, pero no se garantizan los tiempos de respuesta.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Divulgación completa de cookies y almacenamiento del navegador para Exile2 Guides —qué son las cookies, qué usamos, cookies de terceros y cómo gestionar tus preferencias.",
      title: "Política de cookies",
      sections: [
        {
          title: "Qué son las cookies",
          paragraphs: [
            "Las cookies son pequeños archivos de texto que los sitios web almacenan en tu computadora, teléfono u otro dispositivo conectado a internet cuando los visitas. Se utilizan ampliamente para que los sitios web funcionen correctamente, mejoren el rendimiento, recuerden las preferencias de los usuarios y proporcionen información a los operadores del sitio.",
            "Los sitios web también pueden usar tecnologías similares como LocalStorage, SessionStorage o IndexedDB (colectivamente 'almacenamiento del navegador'). En esta página, las referencias a 'cookies' abarcan todas esas tecnologías, salvo que se especifique lo contrario.",
          ],
        },
        {
          title: "Cómo usamos las cookies",
          paragraphs: [
            "Exile2 Guides no establece intencionalmente ninguna cookie ni escribe en el almacenamiento del navegador. No utilizamos cookies de sesión, cookies persistentes, píxeles de seguimiento, scripts de huella digital ni ningún otro mecanismo que almacene datos en tu dispositivo.",
            "Nuestro sitio no emplea servicios de analítica, redes publicitarias, widgets de redes sociales, contenido de terceros incrustado ni ninguna otra función que requiera la recopilación de datos basada en cookies.",
            "Tu navegador aún puede crear entradas de caché HTTP estándar para nuestros recursos estáticos (HTML, CSS, JavaScript, imágenes). Estas son controladas enteramente por tu navegador, no contienen datos personales y se gestionan según los protocolos estándar de almacenamiento en caché web.",
          ],
        },
        {
          title: "Categorías de cookies",
          table: {
            headers: [
              "Categoría de cookie",
              "Propósito",
              "Duración",
              "Estado en este sitio",
            ],
            rows: [
              [
                "Estrictamente necesarias",
                "Funcionalidad del sitio, seguridad, equilibrio de carga",
                "Sesión",
                "No utilizadas",
              ],
              [
                "Preferencias",
                "Idioma, tema, configuración de visualización",
                "Hasta 1 año",
                "No utilizadas",
              ],
              [
                "Analíticas",
                "Estadísticas de uso, rendimiento de página",
                "Hasta 2 años",
                "No utilizadas",
              ],
              [
                "Publicitarias",
                "Segmentación de anuncios, seguimiento de campañas",
                "Hasta 2 años",
                "No utilizadas",
              ],
              [
                "Redes sociales",
                "Compartir en redes sociales, contenido incrustado",
                "Varía",
                "No utilizadas",
              ],
            ],
          },
        },
        {
          title: "Cookies de terceros",
          paragraphs: [
            "Exile2 Guides no incrusta ningún servicio de terceros que establezca cookies en tu dispositivo. No utilizamos Google Analytics, Facebook Pixel, widgets de Twitter, incrustaciones de YouTube, comentarios de Disqus ni ninguna otra integración de terceros que implique recopilación de datos externa.",
            "Nuestro sitio contiene enlaces a sitios web externos, incluidos wikis comunitarias, notas de parche oficiales, herramientas de fanáticos y plataformas de transmisión. Estos sitios externos tienen sus propias políticas de cookies, independientes de la nuestra.",
          ],
        },
        {
          title: "Cambios futuros en el uso de cookies",
          paragraphs: [
            "Si una versión futura de este sitio introduce funciones que requieran cookies o almacenamiento del navegador —como la persistencia de preferencias de idioma, el alternador de modo oscuro, analíticas de uso o publicidad—, esta página se actualizará antes de que esas funciones se activen.",
            "Cada nueva cookie o mecanismo de almacenamiento se documentará aquí con su nombre, proveedor, propósito, duración máxima y los controles de privacidad disponibles para ti. Cuando la ley lo exija, implementaremos mecanismos de consentimiento antes de establecer cookies no esenciales.",
          ],
        },
        {
          title: "Gestión de cookies en tu navegador",
          paragraphs: [
            "Tienes derecho a controlar cómo los sitios web usan cookies en tu dispositivo. La mayoría de los navegadores modernos ofrecen los siguientes controles:",
          ],
          bullets: [
            "Ver y eliminar cookies existentes —consulta todas las cookies almacenadas por cada sitio web y elimínalas individualmente o en bloque.",
            "Bloquear todas las cookies —impide que cualquier sitio web almacene cookies. Esto puede hacer que algunos sitios funcionen mal.",
            "Bloquear cookies de terceros —solo permite cookies del sitio web que visitas directamente.",
            "Modo privado o de incógnito —elimina automáticamente todas las cookies al cerrar la sesión de navegación.",
          ],
        },
        {
          title: "Instrucciones específicas del navegador",
          bullets: [
            "Google Chrome — Configuración > Privacidad y seguridad > Cookies y otros datos de sitios",
            "Mozilla Firefox — Configuración > Privacidad y seguridad > Cookies y datos de sitios",
            "Apple Safari — Preferencias > Privacidad > Cookies y datos de sitios web",
            "Microsoft Edge — Configuración > Cookies y permisos de sitios > Administrar y eliminar cookies",
            "Opera — Configuración > Avanzado > Privacidad y seguridad > Configuración de sitios > Cookies",
          ],
        },
        {
          title: "Contáctanos",
          paragraphs: [
            "Si tienes preguntas sobre nuestras prácticas de cookies, contáctanos en contact@stratlore.com.",
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Avisos legales importantes que cubren el estado no oficial, la exactitud del contenido, el asesoramiento financiero, los enlaces externos y la responsabilidad del usuario de Exile2 Guides.",
      title: "Aviso legal",
      sections: [
        {
          title: "Recurso no oficial creado por fanáticos",
          paragraphs: [
            "Exile2 Guides es un sitio web independiente y no oficial creado por fanáticos. No está afiliado, respaldado, patrocinado ni conectado de otra forma con Grinding Gear Games Limited ('GGG'), el desarrollador y editor de Path of Exile 2.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games y todas las marcas, personajes, nombres, obras de arte y otros materiales relacionados son marcas comerciales o marcas comerciales registradas de Grinding Gear Games Limited. Todos los derechos están reservados por sus respectivos propietarios. El uso de estos materiales en este sitio es únicamente para fines informativos y de la comunidad de fanáticos, y no implica afiliación ni respaldo alguno por parte de GGG.",
            "No tenemos acceso a datos de juego no públicos, versiones de desarrollo internas, información confidencial de servidores ni ningún otro material propiedad de Grinding Gear Games.",
          ],
        },
        {
          title: "Exactitud y actualidad del contenido",
          paragraphs: [
            "Nos esforzamos por garantizar que todo el contenido de la guía sea preciso, esté bien fundamentado y actualizado en el momento de su publicación. Sin embargo, Path of Exile 2 es un juego de servicio en línea que recibe actualizaciones frecuentes, cambios de equilibrio, correcciones y parches importantes que pueden alterar las mecánicas del juego, las propiedades de los objetos, el comportamiento de las habilidades y los sistemas de progresión.",
            "Como resultado, la información que era precisa en el momento de su redacción puede volverse obsoleta o incorrecta tras una actualización del juego. No podemos garantizar que cada artículo se actualice inmediatamente después de cada parche.",
            "Los lectores siempre deben verificar la información de la guía con las notas de parche oficiales más recientes, los mensajes emergentes del juego y las pruebas de la comunidad antes de tomar decisiones importantes de jugabilidad. Exile2 Guides no se hace responsable de ninguna consecuencia dentro del juego derivada de la dependencia de información que se ha vuelto obsoleta.",
          ],
        },
        {
          title: "No es asesoramiento financiero ni profesional",
          paragraphs: [
            "Todo el contenido se proporciona únicamente con fines informativos, educativos y de entretenimiento generales. Nada en este sitio constituye asesoramiento financiero, asesoramiento de inversión, asesoramiento de trading ni ninguna otra forma de asesoramiento profesional.",
            "Path of Exile 2 es un videojuego. El contenido de la guía nunca debe interpretarse como una recomendación para comprar, vender, intercambiar o canjear ningún objeto, moneda, cuenta o servicio del juego por dinero real. No facilitamos, fomentamos ni respaldamos el comercio por dinero real (RMT) en ninguna forma.",
            "Cualquier decisión que tomes basada en la información de este sitio es bajo tu propio riesgo. No somos responsables de ninguna pérdida —dentro del juego o de otro tipo— que pueda resultar de seguir nuestras guías, recomendaciones de build o sugerencias de estrategia.",
          ],
        },
        {
          title: "Enlaces externos y contenido de terceros",
          paragraphs: [
            "Exile2 Guides puede contener enlaces a sitios web externos para proporcionar contexto adicional, material de referencia o herramientas comunitarias. Estos enlaces se proporcionan por conveniencia y no implican respaldo del contenido enlazado.",
            "No controlamos el contenido, la exactitud, las prácticas de privacidad, las medidas de seguridad ni la disponibilidad de ningún sitio web externo. La inclusión de un enlace no significa que garantizamos la información presentada en ese sitio.",
            "Los sitios web externos pueden cambiar su contenido, estructura o disponibilidad en cualquier momento sin previo aviso. Si encuentras un enlace roto o una referencia externa desactualizada, repórtalo a través de nuestra página de Contacto.",
          ],
        },
        {
          title: "Responsabilidad del usuario",
          paragraphs: [
            "El uso que hagas de cualquier información, guía, build, estrategia u otro contenido de Exile2 Guides es totalmente bajo tu propio riesgo. No ofrecemos garantías ni declaraciones, expresas o implícitas, respecto a la integridad, exactitud, fiabilidad, idoneidad o disponibilidad de cualquier contenido de este sitio.",
            "Los jugadores son los únicos responsables de sus propias decisiones dentro del juego, incluyendo los builds de personaje, las asignaciones del árbol de habilidades pasivas, las compras de objetos, el gasto de monedas, la actividad comercial y la estrategia de jugabilidad.",
            "Exile2 Guides no será responsable de ningún daño directo, indirecto, incidental, consecuente o especial que surja del uso o la imposibilidad de usar cualquier contenido de este sitio. Esto incluye, sin limitación, la pérdida de progreso en el juego, objetos, monedas, estatus de la cuenta o cualquier otra pérdida virtual o del mundo real.",
          ],
        },
        {
          title: "Uso justo y propiedad intelectual",
          paragraphs: [
            "El contenido relacionado con el juego en este sitio, incluyendo referencias a mecánicas del juego, nombres de objetos, descripciones de habilidades y estrategias de jefes, se utiliza bajo los principios de uso justo y con el fin de proporcionar guías y comentarios del juego creados por la comunidad.",
            "Respetamos los derechos de propiedad intelectual de Grinding Gear Games y de todos los demás titulares de derechos. Si crees que cualquier contenido de este sitio infringe tus derechos de propiedad intelectual, contáctanos de inmediato en contact@stratlore.com con los detalles de tu reclamación.",
            "Todo el contenido editorial original, los elementos de diseño y la infraestructura del sitio creados por el equipo de Exile2 Guides no pueden ser reproducidos, distribuidos ni utilizados con fines comerciales sin el consentimiento previo por escrito.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Política de privacidad completa de Exile2 Guides —prácticas de datos, uso de cookies, servicios de terceros, tus derechos bajo el RGPD y la CCPA, y cómo protegemos tu información.",
      title: "Política de privacidad",
      sections: [
        {
          title: "Resumen",
          paragraphs: [
            "Esta Política de privacidad describe cómo Exile2 Guides ('nosotros', 'nuestro') maneja los datos personales y la privacidad de los visitantes a nuestro sitio web. Estamos comprometidos a proteger tu privacidad y a ser transparentes sobre nuestras prácticas de datos.",
            "Esta política se aplica a todos los usuarios independientemente de su ubicación geográfica. Al usar este sitio, reconoces que has leído y comprendido esta Política de privacidad. Última actualización: julio de 2026.",
          ],
        },
        {
          title: "Información que recopilamos",
          paragraphs: [
            "Exile2 Guides es un sitio web de contenido estático de solo lectura. No recopilamos, almacenamos, procesamos ni transmitimos datos personales. Específicamente:",
          ],
          bullets: [
            "No requerimos registro de usuarios, cuentas ni autenticación de ningún tipo.",
            "No recopilamos nombres, direcciones de correo electrónico, direcciones IP ni ninguna otra información personal identificable.",
            "No operamos sistemas de registro del lado del servidor que registren información de los visitantes.",
            "No utilizamos píxeles de seguimiento, balizas web ni técnicas de huella digital del navegador.",
            "No procesamos cargas de usuarios, comentarios, publicaciones en foros ni ningún otro contenido generado por el usuario.",
            "No operamos sistemas de pago, servicios de suscripción ni funcionalidad de comercio electrónico.",
            "No establecemos cookies ni escribimos en el almacenamiento del navegador (consulta nuestra Política de cookies para más detalles).",
          ],
        },
        {
          title: "Nuestras prácticas de datos de un vistazo",
          table: {
            headers: ["Práctica de datos", "Estado actual"],
            rows: [
              ["Cuentas de usuario y autenticación", "No disponible"],
              ["Recopilación de datos personales", "Ninguna recopilada"],
              ["Registro de acceso del lado del servidor", "No habilitado"],
              ["Analíticas y seguimiento", "No habilitado"],
              ["Publicidad y marketing", "No habilitado"],
              ["Cookies y LocalStorage", "No utilizadas intencionalmente"],
              [
                "Envíos de formulario de contacto",
                "No habilitado (solo correo)",
              ],
              ["Contenido generado por el usuario", "No aceptado"],
              ["Compartición de datos con terceros", "Ninguna"],
              ["Seguimiento entre sitios", "Ninguno"],
            ],
          },
        },
        {
          title: "Cookies y almacenamiento del navegador",
          paragraphs: [
            "Exile2 Guides no establece intencionalmente cookies ni escribe en ninguna forma de almacenamiento del navegador. No utilizamos cookies de analítica, cookies publicitarias, cookies de preferencias ni ninguna otra categoría de cookie.",
            "Tu navegador puede crear entradas de caché HTTP estándar para nuestros recursos estáticos. Estas son controladas por tu navegador, no contienen datos personales y se gestionan según los protocolos estándar de almacenamiento en caché web. Para información completa, consulta nuestra Política de cookies.",
          ],
        },
        {
          title: "Servicios de terceros",
          paragraphs: [
            "No integramos ningún servicio de terceros que recopile datos de usuarios. No utilizamos Google Analytics, Cloudflare Analytics con recopilación de datos, Facebook Pixel, seguimiento de Twitter, Hotjar, Mixpanel ni ningún otro servicio de recopilación de datos.",
            "Nuestro sitio está alojado en Cloudflare Pages, que sirve archivos estáticos. La infraestructura de Cloudflare puede procesar solicitudes a nivel de red por motivos de seguridad y rendimiento, pero no configuramos ninguna función de recopilación de datos en nuestro extremo.",
            "Nuestro sitio contiene enlaces a sitios web externos que operan bajo sus propias políticas de privacidad. Te alentamos a revisar sus políticas antes de proporcionar cualquier información personal.",
          ],
        },
        {
          title: "Tus derechos de protección de datos",
          paragraphs: [
            "Dependiendo de tu jurisdicción, puedes tener los siguientes derechos de protección de datos:",
          ],
          bullets: [
            "Derecho de acceso (Artículo 15 del RGPD) —solicitar copias de tus datos personales. Como no recopilamos datos personales, no hay datos que proporcionar.",
            "Derecho de rectificación (Artículo 16 del RGPD) —solicitar la corrección de datos personales inexactos. No aplicable, ya que no poseemos datos personales.",
            "Derecho de supresión (Artículo 17 del RGPD) —solicitar la eliminación de tus datos personales. No aplicable, ya que no poseemos datos personales.",
            "Derecho a limitar el tratamiento (Artículo 18 del RGPD) —solicitar límites sobre cómo usamos tus datos. No aplicable, ya que no poseemos datos personales.",
            "Derecho a la portabilidad de los datos (Artículo 20 del RGPD) —solicitar la transferencia de tus datos. No aplicable, ya que no poseemos datos personales.",
            "CCPA —los residentes de California tienen derecho a saber, eliminar, optar por no vender y a la no discriminación. Como no recopilamos ni vendemos información personal, estos derechos se satisfacen inherentemente.",
          ],
        },
        {
          title: "Privacidad de los niños",
          paragraphs: [
            "Exile2 Guides no recopila intencionalmente datos personales de niños menores de 13 años (o la edad de consentimiento digital aplicable en tu jurisdicción). Como no recopilamos datos personales de ningún usuario, esto es así por naturaleza.",
            "Si eres padre o tutor y crees que un niño ha proporcionado datos personales a través de un mecanismo imprevisto, contáctanos y tomaremos las medidas adecuadas para abordar la situación.",
          ],
        },
        {
          title: "Transferencias internacionales de datos",
          paragraphs: [
            "Como Exile2 Guides no recopila, almacena ni procesa datos personales, no hay transferencias internacionales de datos que divulgar. Nuestro contenido estático se sirve a través de una red global de distribución de contenido, pero ningún dato personal se incluye en o se deriva de estas entregas.",
          ],
        },
        {
          title: "Cambios a esta Política de privacidad",
          paragraphs: [
            "Podemos actualizar esta Política de privacidad de vez en cuando para reflejar cambios en nuestras prácticas, tecnología, requisitos legales u otros factores. Cualquier cambio material se anunciará mediante un aviso destacado en el sitio.",
            "La fecha de 'Última actualización' en la parte superior de esta página refleja la revisión más reciente. El uso continuado del sitio tras los cambios constituye la aceptación de la política actualizada.",
            "Si introducimos prácticas que involucren la recopilación de datos personales, esta política se reescribirá de forma integral antes de que esas prácticas comiencen, y se notificará a los usuarios afectados.",
          ],
        },
        {
          title: "Contáctanos",
          paragraphs: [
            "Si tienes preguntas, inquietudes o solicitudes respecto a esta Política de privacidad o nuestras prácticas de datos, contáctanos en:",
            "Correo electrónico: contact@stratlore.com",
            "Responderemos a todas las consultas relacionadas con la privacidad dentro de los 30 días, de acuerdo con las regulaciones aplicables de protección de datos.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Términos y condiciones completos que rigen el uso de Exile2 Guides —aceptación, conducta del usuario, propiedad intelectual, exenciones de responsabilidad, limitaciones de responsabilidad y resolución de disputas.",
      title: "Términos de uso",
      sections: [
        {
          title: "Aceptación de los términos",
          paragraphs: [
            "Estos Términos de uso ('Términos') rigen tu acceso y uso del sitio web de Exile2 Guides ('Sitio'), incluyendo todo el contenido, las funciones y la funcionalidad disponibles en o a través del sitio.",
            "Al acceder, navegar o usar Exile2 Guides, reconoces que has leído, comprendido y aceptas estar sujeto a estos Términos en su totalidad. Si no estás de acuerdo con todos estos Términos, no debes acceder ni usar este sitio.",
            "Estos Términos constituyen un acuerdo legalmente vinculante entre tú ('Usuario') y los operadores de Exile2 Guides. Tu uso continuado del sitio tras cualquier modificación constituye la aceptación de dichos cambios.",
          ],
        },
        {
          title: "Descripción del servicio",
          paragraphs: [
            "Exile2 Guides es un sitio web de contenido estático, gratuito y de solo lectura que proporciona guías de juego creadas por la comunidad, recomendaciones de build, estrategias de jefes, bases de datos de objetos, referencias de habilidades y otro contenido informativo relacionado con Path of Exile 2.",
            "El sitio no ofrece cuentas de usuario, funciones interactivas, envío de contenido generado por el usuario, comercio electrónico, procesamiento de pagos ni ningún otro servicio más allá de la visualización de contenido estático.",
            "Nos reservamos el derecho de modificar, suspender o interrumpir cualquier parte del sitio en cualquier momento, con o sin previo aviso.",
          ],
        },
        {
          title: "Elegibilidad",
          paragraphs: [
            "Exile2 Guides está destinado al público en general. No hay requisito de edad mínima para acceder a nuestro contenido estático. Sin embargo, si eres menor de edad en tu jurisdicción, debes revisar estos Términos con un padre o tutor.",
            "Al usar este sitio, declaras y garantizas que tienes la capacidad legal para celebrar estos Términos y que tu uso no viola ninguna ley o regulación aplicable en tu jurisdicción.",
          ],
        },
        {
          title: "Uso permitido",
          paragraphs: [
            "Puedes acceder, navegar y usar el contenido únicamente con fines personales, no comerciales e informativos.",
            "Puedes compartir enlaces a nuestro contenido en redes sociales, foros u otras plataformas, siempre que se otorgue la atribución adecuada y los enlaces dirijan a los usuarios al contenido original en nuestro sitio.",
            "Puedes imprimir o guardar páginas individuales para referencia personal sin conexión, siempre que no se modifique, republicue ni redistribuya ningún contenido.",
          ],
        },
        {
          title: "Conducta prohibida",
          paragraphs: [
            "Aceptas no participar en ninguna de las siguientes actividades prohibidas:",
          ],
          bullets: [
            "Usar sistemas automatizados (bots, rastreadores, crawlers) para acceder, recopilar o monitorear contenido sin permiso previo por escrito.",
            "Intentar obtener acceso no autorizado a cualquier parte del sitio, sus servidores o cualquier sistema conectado.",
            "Lanzar ataques de denegación de servicio, pruebas de estrés u otro intento de interrumpir la operación del sitio.",
            "Transmitir virus, malware o cualquier otro código malicioso a través del sitio o hacia él.",
            "Suplantar a cualquier persona o entidad, o representar falsamente tu afiliación con cualquier persona o entidad.",
            "Usar el sitio con cualquier fin ilegal o en violación de cualquier ley local, nacional o internacional.",
            "Eludir o intentar eludir cualquier medida de seguridad o control de acceso en el sitio.",
          ],
        },
        {
          title: "Derechos de propiedad intelectual",
          paragraphs: [
            "Todo el contenido original de Exile2 Guides —incluyendo texto editorial, estructura de la guía, compilaciones de datos, elementos de diseño y código del sitio— está protegido por las leyes aplicables de derechos de autor, marcas comerciales y propiedad intelectual.",
            "No puedes reproducir, distribuir, modificar, crear obras derivadas, exhibir públicamente ni explotar comercialmente ningún contenido original sin el consentimiento previo por escrito.",
            "Path of Exile, Path of Exile 2 y todos los recursos del juego relacionados son marcas comerciales de Grinding Gear Games Limited. Estos materiales se utilizan bajo los principios de uso justo con fines de guía y comentario de la comunidad. No reclamamos la propiedad de ninguna propiedad intelectual de Grinding Gear Games.",
            "Si crees que cualquier contenido infringe tus derechos de propiedad intelectual, contáctanos en contact@stratlore.com con una descripción detallada de la presunta infracción.",
          ],
        },
        {
          title: "Exención de garantías",
          paragraphs: [
            "EXILE2 GUIDES SE PROPORCIONA SOBRE UNA BASE 'TAL CUAL' Y 'SEGÚN DISPONIBILIDAD' SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS, INCLUYENDO, SIN LIMITACIÓN, GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.",
            "No garantizamos que el sitio esté libre de interrupciones, sea libre de errores o completamente seguro. No garantizamos que el contenido sea preciso, completo, confiable, actual o libre de errores.",
            "Reconoces que las mecánicas del juego cambian con frecuencia con las actualizaciones. El contenido puede volverse obsoleto en cualquier momento sin previo aviso. No garantizamos que ninguna guía, recomendación de build o estrategia produzca resultados específicos.",
            "Cualquier material descargado u obtenido a través del sitio se accede bajo tu propia discreción y riesgo. Eres el único responsable de cualquier daño a tu sistema informático o pérdida de datos que resulte del acceso a cualquier material.",
          ],
        },
        {
          title: "Limitación de responsabilidad",
          paragraphs: [
            "EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY APLICABLE, EN NINGÚN CASO EXILE2 GUIDES, SUS OPERADORES, COLABORADORES O AFILIADOS SERÁN RESPONSABLES DE NINGÚN DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O PUNITIVO QUE SURJA DEL O RELACIONADO CON TU USO O LA IMPOSIBILIDAD DE USAR EL SITIO.",
            "Esta limitación se aplica a todas las formas de daños, incluyendo, sin limitación: pérdida de progreso en el juego, objetos, monedas o estatus de la cuenta; pérdida de datos; pérdida de ingresos o ganancias anticipadas; y cualquier daño indirecto, especial, incidental, consecuente o punitivo, ya sea basado en incumplimiento de contrato, agravio, responsabilidad estricta o cualquier otra teoría legal.",
            "Estas limitaciones se aplican independientemente de si Exile2 Guides ha sido advertido de la posibilidad de tales daños. Si no estás satisfecho con cualquier contenido o estos Términos, tu único recurso es dejar de usar el sitio.",
          ],
        },
        {
          title: "Indemnización",
          paragraphs: [
            "Aceptas indemnizar, defender y mantener indemne a Exile2 Guides, sus operadores, colaboradores y afiliados frente a cualquier y todos los reclamos, responsabilidades, daños, pérdidas, costos y gastos (incluidos honorarios legales razonables) que surjan de o estén de cualquier manera relacionados con: (a) tu acceso o uso del sitio; (b) tu violación de estos Términos; (c) tu violación de cualquier derecho de terceros, incluyendo cualquier derecho de propiedad intelectual, privacidad o propiedad; o (d) cualquier reclamo de que tu contenido o acciones causaron daño a un tercero.",
          ],
        },
        {
          title: "Modificaciones a los términos",
          paragraphs: [
            "Nos reservamos el derecho de modificar estos Términos en cualquier momento a nuestra entera discreción. Cuando hagamos cambios, actualizaremos la fecha de 'Última actualización' en la parte superior de esta página. Los cambios materiales pueden comunicarse mediante un aviso destacado en el sitio.",
            "Si no estás de acuerdo con alguna modificación, debes dejar de usar el sitio. Tu uso continuado tras cualquier cambio constituye la aceptación de los Términos revisados.",
          ],
        },
        {
          title: "Ley aplicable y resolución de disputas",
          paragraphs: [
            "Estos Términos se regirán e interpretarán de acuerdo con las leyes de la jurisdicción en la que se basan los operadores del sitio, sin consideración a sus disposiciones sobre conflictos de leyes.",
            "Cualquier disputa que surja de o en relación con estos Términos se intentará resolver primero mediante negociación de buena fe. Si la negociación falla, las disputas se someterán a los tribunales competentes de la jurisdicción aplicable.",
            "Aceptas que cualquier procedimiento de resolución de disputas se llevará a cabo únicamente de forma individual, y no en una acción de clase, consolidada o representativa.",
          ],
        },
        {
          title: "Disposiciones generales",
          paragraphs: [
            "Si alguna disposición de estos Términos se considera inaplicable o inválida, dicha disposición se limitará o eliminará en la medida mínima necesaria para que estos Términos permanezcan en pleno vigor y efecto.",
            "Nuestra falta de aplicación de cualquier derecho o disposición de estos Términos no se considerará una renuncia a tales derechos. La renuncia a cualquier derecho o disposición será efectiva solo si se hace por escrito y es firmada por un representante debidamente autorizado.",
            "Estos Términos, junto con nuestra Política de privacidad, Política de cookies y Aviso legal, constituyen el acuerdo completo entre tú y Exile2 Guides con respecto a tu uso del sitio.",
          ],
        },
        {
          title: "Información de contacto",
          paragraphs: [
            "Para preguntas sobre estos Términos de uso, contáctanos en contact@stratlore.com.",
          ],
        },
      ],
    },
  },
  fr: {
    about: {
      description:
        "Découvrez comment Exile2 Guides est exploité, recherché et publié de manière indépendante en tant que ressource non officielle de guides Path of Exile 2.",
      title: "À propos de Exile2 Guides",
      sections: [
        {
          title: "Notre mission",
          paragraphs: [
            "Exile2 Guides est exploité de manière indépendante par un développeur en tant que ressource non officielle de guides Path of Exile 2. L'objectif est d'organiser des réponses utiles et adaptées aux correctifs, sans présenter des résumés de recherche comme une expérience de jeu personnelle.",
            "Le site est en lecture seule et accessible gratuitement. Les articles sont publiés après une recherche structurée et des contrôles qualité automatisés, en affichant l'incertitude et les limites de vérification sur la page lorsque cela est pertinent.",
          ],
        },
        {
          title: "Ce que nous couvrons",
          connectionLinks: [
            {
              description:
                "Configurations de leveling, ensembles de endgame, priorités d'équipement, chemins de l'arbre de passifs et configurations de liens de gemmes pour chaque classe.",
              href: "/en/builds/",
              label: "Builds",
            },
            {
              description:
                "Mécaniques des boss, détail des phases, tables de butin, exigences de résistance et guides stratégiques étape par étape.",
              href: "/en/bosses/",
              label: "Boss",
            },
            {
              description:
                "Bases de données d'objets uniques, mécaniques de monnaie, références d'artisanat et explications des niveaux d'affixes.",
              href: "/en/items/",
              label: "Objets",
            },
            {
              description:
                "Détail des gemmes de compétences actives, appariements de gemmes de soutien, mécaniques de progression et données de progression par niveau.",
              href: "/en/skills/",
              label: "Compétences",
            },
            {
              description:
                "Analyses approfondies des mécaniques, tutoriels pour débutants, réponses à la FAQ et guides de progression généraux.",
              href: "/en/guides/",
              label: "Guides",
            },
          ],
        },
        {
          title: "Normes éditoriales",
          paragraphs: [
            "Les articles sont recherchés à l'aide des notes de correctif officielles, des bases de données actuelles, des guides communautaires établis, de vidéos de gameplay et de discussions de joueurs. Les affirmations sont liées à leurs sources lorsque possible et rédigées avec le contexte du correctif pertinent.",
            "L'assurance qualité automatisée vérifie la structure du contenu, les métadonnées requises, les liens internes, l'état de publication, l'indexabilité et la sortie de compilation avant la publication d'un article.",
            "Lorsqu'une conclusion n'a pas été testée personnellement en jeu, elle est présentée comme vérifiée par la source plutôt que testée en première main. L'incertitude liée à la version reste visible au lieu d'être masquée derrière un langage assuré.",
          ],
        },
        {
          title: "Indépendance",
          paragraphs: [
            "Exile2 Guides est une ressource indépendante créée par des fans. Elle n'est affiliée, approuvée ni sponsorisée par Grinding Gear Games ou toute autre entreprise.",
            "La publication est maintenue par un seul opérateur, et le processus de recherche ne présente pas de tests de gameplay en première main comme terminés lorsqu'ils ne l'ont pas été.",
          ],
        },
        {
          title: "Corrections et commentaires",
          paragraphs: [
            "Les mécaniques du jeu changent fréquemment, et aucun guide n'est parfait. Si vous trouvez une erreur factuelle, une mécanique obsolète ou une source manquante, contactez-nous via notre page Contact ou envoyez-nous un e-mail directement.",
            "Les corrections et les signalements de droits d'auteur sont examinés dans la mesure du temps disponible. Les erreurs factuelles à fort impact sont prioritaires, mais les délais de réponse ne sont pas garantis.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Contactez l'opérateur indépendant de Exile2 Guides au sujet de corrections de contenu, de signalements de droits d'auteur ou de commentaires généraux.",
      title: "Contactez-nous",
      sections: [
        {
          title: "Entrer en contact",
          paragraphs: [
            "Le seul canal de contact public est l'e-mail : contact@stratlore.com. Nous examinons les corrections et les signalements de droits d'auteur dans la mesure du temps disponible. Les erreurs factuelles à fort impact sont prioritaires, mais les délais de réponse ne sont pas garantis.",
            "Il s'agit d'un site statique en lecture seule sans formulaire de contact côté serveur. Veuillez utiliser le lien e-mail direct ci-dessous ; il n'y a pas de bouton d'envoi de message qui pourrait ignorer silencieusement votre demande.",
          ],
          connectionLinks: [
            {
              description:
                "Ouvrez votre client e-mail pour envoyer une correction, un signalement de droits d'auteur ou une autre note.",
              href: "mailto:contact@stratlore.com",
              label: "contact@stratlore.com",
            },
          ],
        },
        {
          title: "Scénarios de contact",
          issueCards: [
            {
              description:
                "Incluez l'URL de la page, l'affirmation spécifique qui est incorrecte, la version du jeu ou le correctif que vous avez testés, ainsi qu'une source fiable ou des étapes de reproduction claires.",
              title: "Correction de contenu",
            },
            {
              description:
                "Fournissez l'URL de la ressource ou de la page, une description du matériel protégé par le droit d'auteur, une preuve de propriété ou d'autorisation, et l'action spécifique que vous demandez.",
              title: "Droits d'auteur ou attribution",
            },
            {
              description:
                "Indiquez-nous quel domaine nécessite attention —builds, boss, objets, compétences ou expérience générale du site— ainsi que votre suggestion détaillée.",
              title: "Commentaires généraux",
            },
          ],
        },
        {
          title: "Que inclure",
          bullets: [
            "L'URL exacte de la page où le problème apparaît, avec une capture d'écran ou le texte cité si possible.",
            "Une source fiable pour la correction —notes de correctif officielles, une entrée de base de données actuelle ou un test ou rapport communautaire clair.",
            "Des détails de reproduction clairs pour toute divergence de mécanique, y compris la version du jeu et la configuration pertinente si connue.",
            "Uniquement les informations personnelles minimales nécessaires pour répondre à votre demande.",
          ],
        },
        {
          title: "Politique d'examen",
          paragraphs: [
            "Nous examinons les corrections et les signalements de droits d'auteur dans la mesure du temps disponible. Les erreurs factuelles à fort impact sont prioritaires, mais les délais de réponse ne sont pas garantis.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Divulgation complète des cookies et du stockage du navigateur pour Exile2 Guides —ce que sont les cookies, ce que nous utilisons, les cookies tiers et comment gérer vos préférences.",
      title: "Politique des cookies",
      sections: [
        {
          title: "Que sont les cookies",
          paragraphs: [
            "Les cookies sont de petits fichiers texte que les sites web stockent sur votre ordinateur, votre téléphone ou un autre appareil connecté à Internet lors de votre visite. Ils sont largement utilisés pour faire fonctionner correctement les sites web, améliorer les performances, mémoriser les préférences des utilisateurs et fournir des informations aux opérateurs du site.",
            "Les sites web peuvent également utiliser des technologies similaires telles que LocalStorage, SessionStorage ou IndexedDB (collectivement « stockage du navigateur »). Sur cette page, les références aux « cookies » englobent toutes ces technologies, sauf indication contraire.",
          ],
        },
        {
          title: "Comment nous utilisons les cookies",
          paragraphs: [
            "Exile2 Guides ne définit intentionnellement aucun cookie ni n'écrit dans le stockage du navigateur. Nous n'utilisons pas de cookies de session, de cookies persistants, de pixels de suivi, de scripts d'empreinte numérique ni tout autre mécanisme stockant des données sur votre appareil.",
            "Notre site n'emploie pas de services d'analyse, de réseaux publicitaires, de widgets de médias sociaux, de contenu tiers intégré ni toute autre fonction nécessitant la collecte de données basée sur les cookies.",
            "Votre navigateur peut tout de même créer des entrées de cache HTTP standard pour nos ressources statiques (HTML, CSS, JavaScript, images). Celles-ci sont entièrement contrôlées par votre navigateur, ne contiennent aucune donnée personnelle et sont gérées selon les protocoles standards de mise en cache web.",
          ],
        },
        {
          title: "Catégories de cookies",
          table: {
            headers: [
              "Catégorie de cookie",
              "Objet",
              "Durée",
              "État sur ce site",
            ],
            rows: [
              [
                "Strictement nécessaires",
                "Fonctionnalité du site, sécurité, équilibrage de charge",
                "Session",
                "Non utilisés",
              ],
              [
                "Préférences",
                "Langue, thème, paramètres d'affichage",
                "Jusqu'à 1 an",
                "Non utilisés",
              ],
              [
                "Analytiques",
                "Statistiques d'utilisation, performance des pages",
                "Jusqu'à 2 ans",
                "Non utilisés",
              ],
              [
                "Publicitaires",
                "Ciblage publicitaire, suivi de campagne",
                "Jusqu'à 2 ans",
                "Non utilisés",
              ],
              [
                "Médias sociaux",
                "Partage social, contenu intégré",
                "Variable",
                "Non utilisés",
              ],
            ],
          },
        },
        {
          title: "Cookies tiers",
          paragraphs: [
            "Exile2 Guides n'intègre aucun service tiers qui déposerait des cookies sur votre appareil. Nous n'utilisons pas Google Analytics, Facebook Pixel, widgets Twitter, intégrations YouTube, commentaires Disqus ni toute autre intégration tierce impliquant une collecte de données externe.",
            "Notre site contient des liens vers des sites web externes, y compris des wikis communautaires, des notes de correctif officielles, des outils de fans et des plateformes de diffusion. Ces sites externes ont leurs propres politiques de cookies, indépendantes de la nôtre.",
          ],
        },
        {
          title: "Évolutions futures de l'utilisation des cookies",
          paragraphs: [
            "Si une version future de ce site introduit des fonctionnalités nécessitant des cookies ou un stockage du navigateur —telles que la persistance des préférences de langue, le basculement du mode sombre, l'analyse d'utilisation ou la publicité—, cette page sera mise à jour avant l'activation de ces fonctionnalités.",
            "Chaque nouveau cookie ou mécanisme de stockage sera documenté ici avec son nom, son fournisseur, son objet, sa durée maximale et les contrôles de confidentialité dont vous disposez. Lorsque la loi l'exige, nous mettrons en place des mécanismes de consentement avant de déposer des cookies non essentiels.",
          ],
        },
        {
          title: "Gestion des cookies dans votre navigateur",
          paragraphs: [
            "Vous avez le droit de contrôler la façon dont les sites web utilisent les cookies sur votre appareil. La plupart des navigateurs modernes offrent les contrôles suivants :",
          ],
          bullets: [
            "Afficher et supprimer les cookies existants —voir tous les cookies stockés par chaque site web et les supprimer individuellement ou en bloc.",
            "Bloquer tous les cookies —empêche tout site web de stocker des cookies. Cela peut entraîner un dysfonctionnement de certains sites.",
            "Bloquer les cookies tiers —autorise uniquement les cookies du site que vous visitez directement.",
            "Mode privé ou incognito —supprime automatiquement tous les cookies à la fermeture de la session de navigation.",
          ],
        },
        {
          title: "Instructions spécifiques au navigateur",
          bullets: [
            "Google Chrome — Paramètres > Confidentialité et sécurité > Cookies et autres données de site",
            "Mozilla Firefox — Paramètres > Confidentialité et sécurité > Cookies et données de site",
            "Apple Safari — Préférences > Confidentialité > Cookies et données des sites web",
            "Microsoft Edge — Paramètres > Cookies et autorisations de site > Gérer et supprimer les cookies",
            "Opera — Paramètres > Avancé > Confidentialité et sécurité > Paramètres de site > Cookies",
          ],
        },
        {
          title: "Contactez-nous",
          paragraphs: [
            "Si vous avez des questions sur nos pratiques en matière de cookies, contactez-nous à contact@stratlore.com.",
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Avertissements juridiques importants couvrant le statut non officiel, l'exactitude du contenu, les conseils financiers, les liens externes et la responsabilité de l'utilisateur de Exile2 Guides.",
      title: "Avertissement",
      sections: [
        {
          title: "Ressource non officielle créée par des fans",
          paragraphs: [
            "Exile2 Guides est un site web indépendant et non officiel créé par des fans. Il n'est affilié, approuvé, sponsorisé ni autrement lié à Grinding Gear Games Limited (« GGG »), le développeur et éditeur de Path of Exile 2.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games et toutes les marques, personnages, noms, œuvres d'art et autres matériels associés sont des marques commerciales ou des marques déposées de Grinding Gear Games Limited. Tous les droits sont réservés à leurs propriétaires respectifs. L'utilisation de ces matériels sur ce site a uniquement un but informatif et communautaire, et n'implique aucune affiliation ni approbation de la part de GGG.",
            "Nous n'avons pas accès à des données de jeu non publiques, à des versions de développement internes, à des informations serveur confidentielles ni à tout autre matériel propriétaire appartenant à Grinding Gear Games.",
          ],
        },
        {
          title: "Exactitude et actualité du contenu",
          paragraphs: [
            "Nous nous efforçons de garantir que tout le contenu des guides est exact, bien sourcé et à jour au moment de la publication. Cependant, Path of Exile 2 est un jeu en service en ligne qui reçoit fréquemment des mises à jour, des changements d'équilibrage, des correctifs et des correctifs majeurs susceptibles de modifier les mécaniques du jeu, les propriétés des objets, le comportement des compétences et les systèmes de progression.",
            "Par conséquent, les informations exactes au moment de la rédaction peuvent devenir obsolètes ou incorrectes après une mise à jour du jeu. Nous ne pouvons garantir que chaque article sera mis à jour immédiatement après chaque correctif.",
            "Les lecteurs doivent toujours confronter les informations des guides avec les notes de correctif officielles les plus récentes, les info-bulles en jeu et les tests communautaires avant de prendre des décisions de jeu importantes. Exile2 Guides n'est pas responsable des conséquences en jeu résultant de la dépendance à des informations devenues obsolètes.",
          ],
        },
        {
          title: "Pas un conseil financier ou professionnel",
          paragraphs: [
            "Tout le contenu est fourni uniquement à des fins d'information, d'éducation et de divertissement général. Rien sur ce site ne constitue un conseil financier, un conseil en investissement, un conseil de trading ou toute autre forme de conseil professionnel.",
            "Path of Exile 2 est un jeu vidéo. Le contenu des guides ne doit jamais être interprété comme une recommandation d'acheter, vendre, échanger ou négocier un objet, une monnaie, un compte ou un service de jeu contre de l'argent réel. Nous ne facilitons, n'encourageons ni n'approuvons le commerce d'argent réel (RMT) sous quelque forme que ce soit.",
            "Toute décision que vous prenez sur la base des informations figurant sur ce site est à vos propres risques. Nous ne sommes responsables d'aucune perte —en jeu ou autre— qui pourrait résulter de la suite de nos guides, recommandations de build ou suggestions de stratégie.",
          ],
        },
        {
          title: "Liens externes et contenu tiers",
          paragraphs: [
            "Exile2 Guides peut contenir des liens vers des sites web externes pour un contexte supplémentaire, du matériel de référence ou des outils communautaires. Ces liens sont fournis pour des raisons de commodité et n'impliquent pas l'approbation du contenu lié.",
            "Nous ne contrôlons pas le contenu, l'exactitude, les pratiques de confidentialité, les mesures de sécurité ni la disponibilité de tout site web externe. L'inclusion d'un lien ne signifie pas que nous garantissons les informations présentées sur ce site.",
            "Les sites web externes peuvent modifier leur contenu, leur structure ou leur disponibilité à tout moment sans préavis. Si vous rencontrez un lien rompu ou une référence externe obsolète, signalez-le via notre page Contact.",
          ],
        },
        {
          title: "Responsabilité de l'utilisateur",
          paragraphs: [
            "L'utilisation de toute information, guide, build, stratégie ou autre contenu de Exile2 Guides se fait entièrement à vos propres risques. Nous ne donnons aucune garantie, expresse ou implicite, concernant l'exhaustivité, l'exactitude, la fiabilité, l'adéquation ou la disponibilité de tout contenu de ce site.",
            "Les joueurs sont seuls responsables de leurs propres décisions en jeu, y compris les builds de personnage, les allocations de l'arbre de compétences passives, les achats d'objets, les dépenses de monnaie, l'activité commerciale et la stratégie de jeu.",
            "Exile2 Guides ne saurait être tenu responsable de tout dommage direct, indirect, accessoire, conséquent ou spécial découlant de l'utilisation ou de l'impossibilité d'utiliser tout contenu de ce site. Cela inclut, sans limitation, la perte de progression en jeu, d'objets, de monnaie, de statut de compte ou toute autre perte virtuelle ou réelle.",
          ],
        },
        {
          title: "Usage équitable et propriété intellectuelle",
          paragraphs: [
            "Le contenu lié au jeu sur ce site, y compris les références aux mécaniques du jeu, aux noms d'objets, aux descriptions de compétences et aux stratégies de boss, est utilisé dans le cadre des principes d'usage équitable et dans le but de fournir des guides et des commentaires de jeu créés par la communauté.",
            "Nous respectons les droits de propriété intellectuelle de Grinding Gear Games et de tous les autres détenteurs de droits. Si vous pensez que tout contenu de ce site porte atteinte à vos droits de propriété intellectuelle, contactez-nous immédiatement à contact@stratlore.com avec les détails de votre réclamation.",
            "Tout le contenu éditorial original, les éléments de conception et l'infrastructure du site créés par l'équipe de Exile2 Guides ne peuvent être reproduits, distribués ou utilisés à des fins commerciales sans consentement écrit préalable.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Politique de confidentialité complète de Exile2 Guides —pratiques de données, utilisation des cookies, services tiers, vos droits selon le RGPD et le CCPA, et la façon dont nous protégeons vos informations.",
      title: "Politique de confidentialité",
      sections: [
        {
          title: "Aperçu",
          paragraphs: [
            "La présente Politique de confidentialité décrit la façon dont Exile2 Guides (« nous », « notre ») traite les données personnelles et la confidentialité des visiteurs de notre site web. Nous nous engageons à protéger votre vie privée et à être transparents sur nos pratiques en matière de données.",
            "Cette politique s'applique à tous les utilisateurs, quel que soit leur lieu géographique. En utilisant ce site, vous reconnaissez avoir lu et compris la présente Politique de confidentialité. Dernière mise à jour : juillet 2026.",
          ],
        },
        {
          title: "Informations que nous collectons",
          paragraphs: [
            "Exile2 Guides est un site web de contenu statique en lecture seule. Nous ne collectons, stockons, traitons ni transmettons de données personnelles. Plus précisément :",
          ],
          bullets: [
            "Nous n'exigeons aucune inscription d'utilisateur, compte ou authentification de quelque nature que ce soit.",
            "Nous ne collectons aucun nom, adresse e-mail, adresse IP ni aucune autre information personnelle identifiante.",
            "Nous n'exploitons aucun système de journalisation côté serveur enregistrant des informations sur les visiteurs.",
            "Nous n'utilisons aucun pixel de suivi, balise web ou technique d'empreinte numérique de navigateur.",
            "Nous ne traitons aucun téléversement d'utilisateur, commentaire, publication de forum ni aucun autre contenu généré par l'utilisateur.",
            "Nous n'exploitons aucun système de paiement, service d'abonnement ou fonctionnalité de commerce électronique.",
            "Nous ne déposons aucun cookie ni n'écrivons dans le stockage du navigateur (voir notre Politique des cookies pour plus de détails).",
          ],
        },
        {
          title: "Nos pratiques de données en un coup d'œil",
          table: {
            headers: ["Pratique de données", "État actuel"],
            rows: [
              ["Comptes et authentification d'utilisateurs", "Non disponible"],
              ["Collecte de données personnelles", "Aucune collectée"],
              ["Journalisation d'accès côté serveur", "Désactivée"],
              ["Analytique et suivi", "Désactivés"],
              ["Publicité et marketing", "Désactivés"],
              ["Cookies et LocalStorage", "Non utilisés intentionnellement"],
              [
                "Soumissions de formulaire de contact",
                "Désactivées (e-mail uniquement)",
              ],
              ["Contenu généré par l'utilisateur", "Non accepté"],
              ["Partage de données avec des tiers", "Aucun"],
              ["Suivi intersites", "Aucun"],
            ],
          },
        },
        {
          title: "Cookies et stockage du navigateur",
          paragraphs: [
            "Exile2 Guides ne définit intentionnellement aucun cookie ni n'écrit dans une quelconque forme de stockage du navigateur. Nous n'utilisons aucun cookie d'analyse, cookie publicitaire, cookie de préférence ni aucune autre catégorie de cookie.",
            "Votre navigateur peut créer des entrées de cache HTTP standard pour nos ressources statiques. Celles-ci sont contrôlées par votre navigateur, ne contiennent aucune donnée personnelle et sont gérées selon les protocoles standards de mise en cache web. Pour des informations complètes, veuillez consulter notre Politique des cookies.",
          ],
        },
        {
          title: "Services tiers",
          paragraphs: [
            "Nous n'intégrons aucun service tiers collectant des données utilisateur. Nous n'utilisons pas Google Analytics, Cloudflare Analytics avec collecte de données, Facebook Pixel, suivi Twitter, Hotjar, Mixpanel ni aucun autre service de collecte de données.",
            "Notre site est hébergé sur Cloudflare Pages, qui sert des fichiers statiques. L'infrastructure de Cloudflare peut traiter des requêtes au niveau du réseau pour la sécurité et la performance, mais nous ne configurons aucune fonctionnalité de collecte de données de notre côté.",
            "Notre site contient des liens vers des sites web externes fonctionnant sous leurs propres politiques de confidentialité. Nous vous encourageons à les consulter avant de fournir toute information personnelle.",
          ],
        },
        {
          title: "Vos droits de protection des données",
          paragraphs: [
            "Selon votre juridiction, vous pouvez disposer des droits de protection des données suivants :",
          ],
          bullets: [
            "Droit d'accès (article 15 du RGPD) —demander des copies de vos données personnelles. Comme nous ne collectons aucune donnée personnelle, il n'y a aucune donnée à fournir.",
            "Droit de rectification (article 16 du RGPD) —demander la correction de données personnelles inexactes. Non applicable car nous ne détenons aucune donnée personnelle.",
            "Droit à l'effacement (article 17 du RGPD) —demander la suppression de vos données personnelles. Non applicable car nous ne détenons aucune donnée personnelle.",
            "Droit à la limitation du traitement (article 18 du RGPD) —demander des limites sur l'utilisation de vos données. Non applicable car nous ne détenons aucune donnée personnelle.",
            "Droit à la portabilité des données (article 20 du RGPD) —demander le transfert de vos données. Non applicable car nous ne détenons aucune donnée personnelle.",
            "CCPA —les résidents de Californie ont le droit de savoir, de supprimer, de refuser la vente et de ne pas subir de discrimination. Comme nous ne collectons ni ne vendons d'informations personnelles, ces droits sont intrinsèquement satisfaits.",
          ],
        },
        {
          title: "Confidentialité des enfants",
          paragraphs: [
            "Exile2 Guides ne collecte pas sciemment de données personnelles auprès d'enfants de moins de 13 ans (ou l'âge de consentement numérique applicable dans votre juridiction). Comme nous ne collectons aucune donnée personnelle auprès d'aucun utilisateur, c'est intrinsèquement le cas.",
            "Si vous êtes un parent ou un tuteur et pensez qu'un enfant a fourni des données personnelles via un mécanisme imprévu, contactez-nous et nous prendrons les mesures appropriées pour résoudre la situation.",
          ],
        },
        {
          title: "Transferts internationaux de données",
          paragraphs: [
            "Comme Exile2 Guides ne collecte, ne stocke ni ne traite de données personnelles, il n'y a aucun transfert international de données à divulguer. Notre contenu statique est servi via un réseau mondial de diffusion de contenu, mais aucune donnée personnelle n'est incluse dans ces livraisons ni n'en est issue.",
          ],
        },
        {
          title: "Modifications de la présente Politique de confidentialité",
          paragraphs: [
            "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre pour refléter des changements dans nos pratiques, notre technologie, nos obligations légales ou d'autres facteurs. Toute modification importante sera annoncée par un avis bien visible sur le site.",
            "La date de « Dernière mise à jour » en haut de cette page reflète la révision la plus récente. L'utilisation continue du site après les modifications vaut acceptation de la politique mise à jour.",
            "Si nous introduisons des pratiques impliquant la collecte de données personnelles, cette politique sera entièrement réécrite avant le début de ces pratiques, et les utilisateurs concernés en seront informés.",
          ],
        },
        {
          title: "Contactez-nous",
          paragraphs: [
            "Si vous avez des questions, des préoccupations ou des demandes concernant la présente Politique de confidentialité ou nos pratiques de données, contactez-nous à :",
            "E-mail : contact@stratlore.com",
            "Nous répondrons à toutes les demandes liées à la confidentialité dans les 30 jours, conformément aux réglementations applicables en matière de protection des données.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Conditions générales complètes régissant votre utilisation de Exile2 Guides —acceptation, conduite de l'utilisateur, propriété intellectuelle, avertissements, limitation de responsabilité et résolution des litiges.",
      title: "Conditions d'utilisation",
      sections: [
        {
          title: "Acceptation des conditions",
          paragraphs: [
            "Les présentes Conditions d'utilisation (« Conditions ») régissent votre accès et votre utilisation du site web de Exile2 Guides (« Site »), y compris tout le contenu, les fonctionnalités et les capacités disponibles sur ou via le site.",
            "En accédant, en naviguant ou en utilisant Exile2 Guides, vous reconnaissez avoir lu, compris et accepté d'être lié par les présentes Conditions dans leur intégralité. Si vous n'acceptez pas l'ensemble de ces Conditions, vous ne devez pas accéder ni utiliser ce site.",
            "Les présentes Conditions constituent un accord juridiquement contraignant entre vous (« Utilisateur ») et les opérateurs de Exile2 Guides. Votre utilisation continue du site suite à toute modification vaut acceptation de ces changements.",
          ],
        },
        {
          title: "Description du service",
          paragraphs: [
            "Exile2 Guides est un site web de contenu statique, gratuit et en lecture seule qui fournit des guides de jeu créés par la communauté, des recommandations de build, des stratégies de boss, des bases de données d'objets, des références de compétences et d'autres contenus informatifs liés à Path of Exile 2.",
            "Le site n'offre pas de comptes d'utilisateur, de fonctionnalités interactives, de soumission de contenu généré par l'utilisateur, de commerce électronique, de traitement de paiement ni aucun autre service au-delà de l'affichage de contenu statique.",
            "Nous nous réservons le droit de modifier, suspendre ou interrompre toute partie du site à tout moment, avec ou sans préavis.",
          ],
        },
        {
          title: "Éligibilité",
          paragraphs: [
            "Exile2 Guides s'adresse au grand public. Il n'y a pas d'âge minimum requis pour acceder à notre contenu statique. Toutefois, si vous êtes mineur dans votre juridiction, vous devez lire les présentes Conditions avec un parent ou un tuteur.",
            "En utilisant ce site, vous déclarez et garantissez avoir la capacité juridique de conclure les présentes Conditions et que votre utilisation ne viole aucune loi ou réglementation applicable dans votre juridiction.",
          ],
        },
        {
          title: "Utilisation autorisée",
          paragraphs: [
            "Vous pouvez accéder, naviguer et utiliser le contenu uniquement à des fins personnelles, non commerciales et informatives.",
            "Vous pouvez partager des liens vers notre contenu sur les réseaux sociaux, les forums ou d'autres plateformes, à condition que l'attribution appropriée soit donnée et que les liens dirigent les utilisateurs vers le contenu original sur notre site.",
            "Vous pouvez imprimer ou enregistrer des pages individuelles pour référence personnelle hors ligne, à condition qu'aucun contenu ne soit modifié, réédité ou redistribué.",
          ],
        },
        {
          title: "Conduite interdite",
          paragraphs: [
            "Vous acceptez de ne pas vous livrer à l'une des activités interdites suivantes :",
          ],
          bullets: [
            "Utiliser des systèmes automatisés (bots, robots d'indexation, crawlers) pour accéder, collecter ou surveiller le contenu sans autorisation écrite préalable.",
            "Tenter d'obtenir un accès non autorisé à toute partie du site, à ses serveurs ou à tout système connecté.",
            "Lancer des attaques par déni de service, des tests de charge ou toute autre tentative de perturber le fonctionnement du site.",
            "Transmettre des virus, des logiciels malveillants ou tout autre code malveillant via ou vers le site.",
            "Usurper l'identité de toute personne ou entité, ou faussement représenter votre affiliation avec toute personne ou entité.",
            "Utiliser le site à des fins illicites ou en violation de toute loi locale, nationale ou internationale.",
            "Contourner ou tenter de contourner toute mesure de sécurité ou tout contrôle d'accès sur le site.",
          ],
        },
        {
          title: "Droits de propriété intellectuelle",
          paragraphs: [
            "Tout le contenu original de Exile2 Guides —y compris le texte éditorial, la structure des guides, les compilations de données, les éléments de conception et le code du site— est protégé par les lois applicables sur le droit d'auteur, les marques commerciales et la propriété intellectuelle.",
            "Vous ne pouvez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement ou exploiter commercialement tout contenu original sans consentement écrit préalable.",
            "Path of Exile, Path of Exile 2 et tous les éléments de jeu associés sont des marques commerciales de Grinding Gear Games Limited. Ces matériels sont utilisés dans le cadre des principes d'usage équitable à des fins de guides et de commentaires communautaires. Nous ne revendiquons la propriété d'aucune propriété intellectuelle de Grinding Gear Games.",
            "Si vous pensez que tout contenu porte atteinte à vos droits de propriété intellectuelle, contactez-nous à contact@stratlore.com avec une description détaillée de l'atteinte présumée.",
          ],
        },
        {
          title: "Exclusion de garanties",
          paragraphs: [
            "EXILE2 GUIDES EST FOURNI SUR UNE BASE « EN L'ÉTAT » ET « SELON DISPONIBILITÉ » SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS, SANS LIMITATION, LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON.",
            "Nous ne garantissons pas que le site sera ininterrompu, exempt d'erreurs ou totalement sécurisé. Nous ne garantissons pas que le contenu est exact, complet, fiable, actuel ou exempt d'erreurs.",
            "Vous reconnaissez que les mécaniques du jeu changent fréquemment avec les mises à jour. Le contenu peut devenir obsolète à tout moment sans préavis. Nous ne garantissons pas qu'un guide, une recommandation de build ou une stratégie produira des résultats spécifiques.",
            "Tout matériel téléchargé ou obtenu via le site est accessible à votre propre discrétion et à vos propres risques. Vous êtes seul responsable de tout dommage à votre système informatique ou de toute perte de données résultant de l'accès à tout matériel.",
          ],
        },
        {
          title: "Limitation de responsabilité",
          paragraphs: [
            "DANS LA MESURE MAXIMALE PERMISE PAR LA LOI APPLICABLE, EN AUCUN CAS EXILE2 GUIDES, SES OPÉRATEURS, CONTRIBUTEURS OU AFFILIÉS NE POURRONT ÊTRE TENUS RESPONSABLES DE TOUT DOMMAGE DIRECT, INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉQUENT OU PUNITIF DÉCOULANT DE OU LIÉ À VOTRE UTILISATION, OU À L'IMPOSSIBILITÉ D'UTILISER, LE SITE.",
            "Cette limitation s'applique à toutes les formes de dommages, y compris, sans limitation : perte de progression en jeu, d'objets, de monnaie ou de statut de compte ; perte de données ; perte de revenus ou de profits anticipés ; et tout dommage indirect, spécial, accessoire, conséquent ou punitif, que ce soit sur la base d'un manquement contractuel, d'un délit, d'une responsabilité stricte ou de toute autre théorie juridique.",
            "Ces limitations s'appliquent que Exile2 Guides ait ou non été informé de la possibilité de tels dommages. Si vous n'êtes pas satisfait d'un contenu ou des présentes Conditions, votre seul recours est de cesser d'utiliser le site.",
          ],
        },
        {
          title: "Indemnisation",
          paragraphs: [
            "Vous acceptez d'indemniser, de défendre et de tenir harmless Exile2 Guides, ses opérateurs, contributeurs et affiliés contre toute réclamation, responsabilité, dommage, perte, coût et dépense (y compris des frais juridiques raisonnables) découlant de ou liés de quelque manière que ce soit à : (a) votre accès ou votre utilisation du site ; (b) votre violation des présentes Conditions ; (c) votre violation de tout droit de tiers, y compris tout droit de propriété intellectuelle, de confidentialité ou de propriété ; ou (d) toute réclamation selon laquelle votre contenu ou vos actions ont causé un préjudice à un tiers.",
          ],
        },
        {
          title: "Modifications des conditions",
          paragraphs: [
            "Nous nous réservons le droit de modifier les présentes Conditions à tout moment à notre seule discrétion. Lorsque nous apportons des modifications, nous mettrons à jour la date de « Dernière mise à jour » en haut de cette page. Les modifications importantes peuvent être communiquées par un avis bien visible sur le site.",
            "Si vous n'êtes pas d'accord avec une modification quelconque, vous devez cesser d'utiliser le site. Votre utilisation continue après toute modification vaut acceptation des Conditions révisées.",
          ],
        },
        {
          title: "Loi applicable et résolution des litiges",
          paragraphs: [
            "Les présentes Conditions sont régies et interprétées conformément aux lois de la juridiction où sont basés les opérateurs du site, sans égard à ses dispositions sur les conflits de lois.",
            "Tout litige découlant de ou lié aux présentes Conditions fera d'abord l'objet d'une tentative de résolution par négociation de bonne foi. Si la négociation échoue, les litiges seront soumis aux tribunaux compétents de la juridiction applicable.",
            "Vous acceptez que toute procédure de résolution des litiges se déroule uniquement sur une base individuelle, et non dans le cadre d'une action collective, consolidée ou représentative.",
          ],
        },
        {
          title: "Dispositions générales",
          paragraphs: [
            "Si une disposition des présentes Conditions est jugée inapplicable ou invalide, cette disposition sera limitée ou éliminée dans la mesure minimale nécessaire pour que les présentes Conditions restent pleinement en vigueur.",
            "Notre non-application de tout droit ou disposition des présentes Conditions ne sera pas considérée comme une renonciation à ces droits. La renonciation à tout droit ou disposition ne sera effective que si elle est écrite et signée par un représentant dûment autorisé.",
            "Les présentes Conditions, ainsi que notre Politique de confidentialité, notre Politique des cookies et notre Avertissement, constituent l'accord intégral entre vous et Exile2 Guides concernant votre utilisation du site.",
          ],
        },
        {
          title: "Coordonnées de contact",
          paragraphs: [
            "Pour toute question concernant les présentes Conditions d'utilisation, contactez-nous à contact@stratlore.com.",
          ],
        },
      ],
    },
  },
  ja: {
    about: {
      description:
        "Exile2 Guides が、どのように非公式の Path of Exile 2 ガイドリソースとして独立して運営・調査・公開されているかをご紹介します。",
      title: "Exile2 Guides について",
      sections: [
        {
          title: "私たちの使命",
          paragraphs: [
            "Exile2 Guides は、非公式の Path of Exile 2 ガイドリソースとして、開発者一人によって独立して運営されています。目標は、リサーチの要約を個人のゲームプレイ経験として提示することなく、パッチの状況を踏まえた有用な回答を整理することです。",
            "本サイトは読み取り専用で、無料でアクセスできます。記事は構造化された調査と自動品質チェックを経て公開され、重要な不確実性や検証の境界は、必要に応じてページ上に表示されます。",
          ],
        },
        {
          title: "取り扱い内容",
          connectionLinks: [
            {
              description:
                "すべてのクラスのレベリングビルド、エンドゲーム構成、装備の優先度、パッシブツリーの経路、およびジェムリンク構成。",
              href: "/en/builds/",
              label: "ビルド",
            },
            {
              description:
                "ボスメカニクス、フェーズの解説、ドロップテーブル、耐性要件、およびステップバイステップの戦略ガイド。",
              href: "/en/bosses/",
              label: "ボス",
            },
            {
              description:
                "ユニークアイテムのデータベース、通貨のメカニクス、クラフトの参考資料、およびアフィックスティアの説明。",
              href: "/en/items/",
              label: "アイテム",
            },
            {
              description:
                "アクティブスキルジェムの解説、サポートジェムの組み合わせ、スケーリングメカニクス、およびレベル進行データ。",
              href: "/en/skills/",
              label: "スキル",
            },
            {
              description:
                "メカニクスの深掘り、初心者向けチュートリアル、よくある質問への回答、および一般的な進行ガイド。",
              href: "/en/guides/",
              label: "ガイド",
            },
          ],
        },
        {
          title: "編集基準",
          paragraphs: [
            "記事は、公式のパッチノート、最新のデータベース、定評のあるコミュニティガイド、ゲームプレイ動画、およびプレイヤーの議論を用いて調査されています。主張は可能な限り出典にリンクされ、該当するパッチの文脈とともに記述されます。",
            "自動 QA は、記事公開前に、コンテンツの構造、必須メタデータ、内部リンク、公開状態、インデックス可能性、およびビルド成果物をチェックします。",
            "結論が実際にゲーム内でテストされていない場合は、実体験としてではなく、出典検証済みとして提示されます。バージョンに依存する不確実性は、断定的な表現で隠されることなく、そのまま表示されます。",
          ],
        },
        {
          title: "独立性",
          paragraphs: [
            "Exile2 Guides は、独立したファン制作のリソースです。Grinding Gear Games またはその他の企業との提携、承認、スポンサー契約はありません。",
            "本出版物は運営者一人によって維持されており、実際には行われていないファーストハンドのゲームプレイテストを完了済みとして提示することはありません。",
          ],
        },
        {
          title: "修正とフィードバック",
          paragraphs: [
            "ゲームのメカニクスは頻繁に変化し、完璧なガイドは存在しません。事実上の誤り、古いメカニクス、または欠落した出典を発見した場合は、お問い合わせページから、または直接メールでお知らせください。",
            "修正および著作権の報告は、時間の許す範囲で確認されます。影響の大きい事実上の誤りが優先されますが、回答までの期間は保証されません。",
          ],
        },
      ],
    },
    contact: {
      description:
        "コンテンツの修正、著作権の報告、または一般的なフィードバックについて、独立して運営する Exile2 Guides にご連絡ください。",
      title: "お問い合わせ",
      sections: [
        {
          title: "ご連絡方法",
          paragraphs: [
            "公開されている唯一の連絡手段はメールアドレス：contact@stratlore.com です。修正および著作権の報告は、時間の許す範囲で確認されます。影響の大きい事実上の誤りが優先されますが、回答までの期間は保証されません。",
            "本サイトは読み取り専用の静的サイトであり、サーバー側のお問い合わせフォームはありません。以下の直接メールリンクをご利用ください。リクエストを黙って破棄するような送信ボタンは存在しません。",
          ],
          connectionLinks: [
            {
              description:
                "修正、著作権の報告、またはその他のメモを送信するためにメールクライアントを開きます。",
              href: "mailto:contact@stratlore.com",
              label: "contact@stratlore.com",
            },
          ],
        },
        {
          title: "お問い合わせの例",
          issueCards: [
            {
              description:
                "問題のあるページの URL、誤りのある具体的な記述、テストしたゲームのバージョンまたはパッチ、および信頼できる出典または明確な再現手順を含めてください。",
              title: "コンテンツの修正",
            },
            {
              description:
                "対象のアセットまたはページの URL、著作権のある素材の説明、所有権または許諾の証明、および求める具体的な対応をご提供ください。",
              title: "著作権または帰属",
            },
            {
              description:
                "どの分野（ビルド、ボス、アイテム、スキル、またはサイト全体の体験）に注意が必要か、および詳細なご提案をお知らせください。",
              title: "一般的なフィードバック",
            },
          ],
        },
        {
          title: "記載すべき内容",
          bullets: [
            "問題が発生している正確なページの URL。可能であればスクリーンショットや引用テキストも。",
            "修正のための信頼できる出典 —公式のパッチノート、最新のデータベースの項目、または明確なコミュニティのテスト／報告。",
            "メカニクスの相違に関する明確な再現詳細。ゲームのバージョンおよび関連する設定がわかっている場合はそれも。",
            "お問い合わせへの回答に必要な最小限の個人情報のみ。",
          ],
        },
        {
          title: "確認ポリシー",
          paragraphs: [
            "修正および著作権の報告は、時間の許す範囲で確認されます。影響の大きい事実上の誤りが優先されますが、回答までの期間は保証されません。",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Exile2 Guides の Cookie およびブラウザストレージの完全な開示 —Cookie とは何か、当サイトの使用状況、サードパーティ Cookie、および設定の管理方法。",
      title: "Cookie ポリシー",
      sections: [
        {
          title: "Cookie とは",
          paragraphs: [
            "Cookie とは、Web サイトを訪問した際に、コンピュータ、スマートフォン、その他のインターネット接続デバイスにサイトが保存する小さなテキストファイルです。Web サイトを正しく機能させ、パフォーマンスを向上させ、ユーザーの設定を記憶させ、サイト運営者に情報を提供するために広く使用されています。",
            "Web サイトでは、LocalStorage、SessionStorage、IndexedDB（総称して「ブラウザストレージ」）などの類似技術も使用する場合があります。本ページでは、特に明記しない限り、「Cookie」という言及はこれらすべての技術を含みます。",
          ],
        },
        {
          title: "Cookie の使用方法",
          paragraphs: [
            "Exile2 Guides は、意図的にいかなる Cookie も設定せず、ブラウザストレージへの書き込みも行いません。セッション Cookie、永続 Cookie、トラッキングピクセル、フィンガープリントスクリプト、またはデバイスにデータを保存するその他の仕組みは使用しません。",
            "当サイトは、アクセス解析サービス、広告ネットワーク、ソーシャルメディアウィジェット、埋め込みのサードパーティコンテンツ、または Cookie ベースのデータ収集を必要とするその他の機能を利用していません。",
            "ブラウザは引き続き、静的アセット（HTML、CSS、JavaScript、画像）の標準的な HTTP キャッシュエントリを作成する場合があります。これらはブラウザによって完全に管理され、個人データを含まず、標準的な Web キャッシュプロトコルに従って処理されます。",
          ],
        },
        {
          title: "Cookie のカテゴリ",
          table: {
            headers: ["Cookie のカテゴリ", "目的", "期間", "当サイトでの状態"],
            rows: [
              [
                "必須",
                "サイト機能、セキュリティ、負荷分散",
                "セッション",
                "未使用",
              ],
              ["設定", "言語、テーマ、表示設定", "最大 1 年", "未使用"],
              [
                "アクセス解析",
                "利用統計、ページのパフォーマンス",
                "最大 2 年",
                "未使用",
              ],
              [
                "広告",
                "広告ターゲティング、キャンペーンの追跡",
                "最大 2 年",
                "未使用",
              ],
              [
                "ソーシャルメディア",
                "ソーシャル共有、埋め込みコンテンツ",
                "不定",
                "未使用",
              ],
            ],
          },
        },
        {
          title: "サードパーティ Cookie",
          paragraphs: [
            "Exile2 Guides は、デバイスに Cookie を設定するサードパーティサービスを一切埋め込んでいません。Google Analytics、Facebook Pixel、Twitter ウィジェット、YouTube の埋め込み、Disqus コメント、または外部データ収集を伴うその他のサードパーティ統合は使用していません。",
            "当サイトには、コミュニティ Wiki、公式パッチノート、ファンツール、配信プラットフォームなど、外部 Web サイトへのリンクが含まれています。これらの外部サイトは、当サイトとは独立した独自の Cookie ポリシーを持っています。",
          ],
        },
        {
          title: "Cookie 利用の将来の変更",
          paragraphs: [
            "今後のサイトのバージョンで、言語設定の保持、ダークモードの切り替え、利用解析、広告など、Cookie またはブラウザストレージを必要とする機能を導入する場合は、それらの機能を有効化する前に本ページを更新します。",
            "新しい各 Cookie またはストレージの仕組みは、名前、提供者、目的、最大期間、および利用可能なプライバシー管理とともに本ページに記載されます。法的に必要な場合は、必須でない Cookie を設定する前に同意の仕組みを実装します。",
          ],
        },
        {
          title: "ブラウザでの Cookie の管理",
          paragraphs: [
            "デバイス上で Web サイトが Cookie をどのように使用するかを管理する権利があります。大半の最新ブラウザは、次の管理機能を提供しています。",
          ],
          bullets: [
            "既存の Cookie の表示と削除 —各 Web サイトが保存したすべての Cookie を確認し、個別または一括で削除する。",
            "すべての Cookie をブロック —いかなる Web サイトも Cookie を保存できなくなります。一部のサイトで不具合が生じる可能性があります。",
            "サードパーティ Cookie をブロック —直接訪問しているサイトの Cookie のみを許可する。",
            "プライベートまたはシークレットモード —ブラウジングセッションを終了すると、すべての Cookie を自動的に削除する。",
          ],
        },
        {
          title: "ブラウザ別の手順",
          bullets: [
            "Google Chrome — 設定 > プライバシーとセキュリティ > Cookie と他のサイトデータ",
            "Mozilla Firefox — 設定 > プライバシーとセキュリティ > Cookie とサイトデータ",
            "Apple Safari — 環境設定 > プライバシー > Cookie と Web サイトのデータ",
            "Microsoft Edge — 設定 > Cookie とサイトのアクセス許可 > Cookie の管理と削除",
            "Opera — 設定 > 詳細設定 > プライバシーとセキュリティ > サイトの設定 > Cookie",
          ],
        },
        {
          title: "お問い合わせ",
          paragraphs: [
            "Cookie に関する当サイトの取り扱いについてご質問がある場合は、contact@stratlore.com までお問い合わせください。",
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Exile2 Guides の非公式のステータス、コンテンツの正確性、金融アドバイス、外部リンク、およびユーザーの責任に関する重要な免責事項。",
      title: "免責事項",
      sections: [
        {
          title: "非公式のファン制作リソース",
          paragraphs: [
            "Exile2 Guides は、独立した非公式のファン制作 Web サイトです。Path of Exile 2 の開発元および販売元である Grinding Gear Games Limited（「GGG」）との提携、承認、スポンサー契約、またはその他の関係はありません。",
            "Path of Exile、Path of Exile 2、Grinding Gear Games、および関連するすべてのロゴ、キャラクター、名称、アート、その他の素材は、Grinding Gear Games Limited の商標または登録商標です。すべての権利は各所有者に帰属します。本サイトでのこれらの素材の使用は、情報提供およびファンコミュニティの目的のみであり、GGG とのいかなる提携や承認も意味するものではありません。",
            "当サイトは、非公開のゲームデータ、内部開発ビルド、機密サーバー情報、または Grinding Gear Games に属するその他の独自素材へのアクセスはありません。",
          ],
        },
        {
          title: "コンテンツの正確性と最新性",
          paragraphs: [
            "当サイトは、すべてのガイドコンテンツが公開時点で正確かつ出典が明確であり、最新であるよう努めています。しかし、Path of Exile 2 はライブサービスのゲームであり、頻繁にアップデート、バランス調整、ホットフィックス、および大型パッチが適用され、ゲームのメカニクス、アイテムの特性、スキルの挙動、および進行システムが変わる可能性があります。",
            "そのため、執筆時点で正確だった情報も、ゲームのアップデート後に古くなったり誤りになったりする場合があります。各パッチの直後にすべての記事が更新されることは保証できません。",
            "読者は、重要なゲームプレイの決定を下す前に、常に最新の公式パッチノート、ゲーム内のツールチップ、およびコミュニティのテストとガイドの情報を照合する必要があります。Exile2 Guides は、古くなった情報への依拠によって生じたいかなるゲーム内の結果についても責任を負いません。",
          ],
        },
        {
          title: "金融または専門的なアドバイスにあらず",
          paragraphs: [
            "すべてのコンテンツは、一般的な情報提供、教育、および娯楽の目的でのみ提供されます。本サイトのいかなる内容も、金融アドバイス、投資アドバイス、トレーディングアドバイス、またはその他の形態の専門的アドバイスを構成するものではありません。",
            "Path of Exile 2 はビデオゲームです。ガイドの内容を、いかなるゲーム内アイテム、通貨、アカウント、またはサービスを現実の金銭で購入、販売、取引、または交換するための推奨として解釈してはなりません。当サイトは、いかなる形態のリアルマネートレード（RMT）も斡旋、奨励、または推奨しません。",
            "本サイトの情報に基づいて行ったいかなる決定も、自己の責任において行われます。当サイトは、当サイトのガイド、ビルドの推奨、または戦略の提案に従った結果として生じる、ゲーム内を問わず、いかなる損失についても責任を負いません。",
          ],
        },
        {
          title: "外部リンクとサードパーティコンテンツ",
          paragraphs: [
            "Exile2 Guides には、追加の文脈、参考資料、またはコミュニティツールのために、外部 Web サイトへのリンクが含まれる場合があります。これらのリンクは便宜上提供されており、リンク先のコンテンツを推奨するものではありません。",
            "当サイトは、いかなる外部 Web サイトのコンテンツ、正確性、プライバシー慣行、セキュリティ対策、または可用性も管理していません。リンクが含まれているからといって、当サイトがそのサイトの情報を保証することを意味するものではありません。",
            "外部 Web サイトは、予告なくいつでもコンテンツ、構造、または可用性を変更する場合があります。リンク切れや古い外部参照を発見した場合は、お問い合わせページからご報告ください。",
          ],
        },
        {
          title: "ユーザーの責任",
          paragraphs: [
            "Exile2 Guides のいかなる情報、ガイド、ビルド、戦略、またはその他のコンテンツを利用するかは、完全に自己の責任において行われます。当サイトは、本サイトのいかなるコンテンツについても、完全性、正確性、信頼性、適合性、または可用性に関する明示または黙示を問わず、いかなる保証または声明も行いません。",
            "プレイヤーは、キャラクタービルド、パッシブスキルツリーの割り当て、アイテムの購入、通貨の支出、取引活動、およびゲームプレイ戦略を含め、自身のゲーム内の決定について単独で責任を負います。",
            "Exile2 Guides は、本サイトのいかなるコンテンツの使用、または使用不能から生じる、直接的、間接的、付随的、結果的、または特別な損害について責任を負いません。これには、ゲーム内の進行、アイテム、通貨、アカウントのステータス、またはその他の仮想または現実の損失が含まれますが、これらに限定されません。",
          ],
        },
        {
          title: "フェアユースと知的財産権",
          paragraphs: [
            "本サイトのゲーム関連コンテンツ（ゲームメカニクス、アイテム名、スキルの説明、ボス戦略への言及を含む）は、コミュニティ制作のゲームガイドおよび解説を提供する目的で、フェアユースの原則に基づき使用されています。",
            "当サイトは、Grinding Gear Games およびすべての他の権利者の知的財産権を尊重しています。本サイトのいかなるコンテンツがあなたの知的財産権を侵害していると思われる場合は、クレームの詳細を contact@stratlore.com まで直ちにお知らせください。",
            "Exile2 Guides チームが作成したすべてのオリジナルの編集コンテンツ、デザイン要素、およびサイトのインフラストラクチャは、事前の書面による同意なしに、複製、配布、または商用目的で使用することはできません。",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Exile2 Guides の完全なプライバシーポリシー —データの取り扱い、Cookie の使用、サードパーティサービス、GDPR および CCPA に基づくあなたの権利、および情報の保護方法。",
      title: "プライバシーポリシー",
      sections: [
        {
          title: "概要",
          paragraphs: [
            "本プライバシーポリシーは、Exile2 Guides（「当サイト」、「私たち」）が、当サイトの訪問者の個人データおよびプライバシーをどのように取り扱うかを説明するものです。当サイトは、お客様のプライバシーを保護し、データの取り扱いについて透明性を確保することをお約束します。",
            "本ポリシーは、地理的な場所を問わずすべてのユーザーに適用されます。本サイトを利用することにより、お客様は本プライバシーポリシーを読み、理解したことを認めたものとします。最終更新日：2026 年 7 月。",
          ],
        },
        {
          title: "収集する情報",
          paragraphs: [
            "Exile2 Guides は、読み取り専用の静的コンテンツ Web サイトです。当サイトは個人データを収集、保存、処理、または送信しません。具体的には：",
          ],
          bullets: [
            "ユーザー登録、アカウント、またはいかなる種類の認証も必要としません。",
            "氏名、メールアドレス、IP アドレス、またはその他の個人を特定できる情報を収集しません。",
            "訪問者の情報を記録するサーバー側のログシステムを運用していません。",
            "トラッキングピクセル、ウェブビーコン、またはブラウザフィンガープリント技術を使用しません。",
            "ユーザーのアップロード、コメント、フォーラム投稿、またはその他のユーザー生成コンテンツを処理しません。",
            "決済システム、サブスクリプションサービス、または eコマース機能を運用していません。",
            "Cookie を設定せず、ブラウザストレージへ書き込みません（詳細は Cookie ポリシーを参照）。",
          ],
        },
        {
          title: "データの取り扱いの概観",
          table: {
            headers: ["データの取り扱い", "現在の状態"],
            rows: [
              ["ユーザーアカウントと認証", "利用不可"],
              ["個人データの収集", "収集なし"],
              ["サーバー側のアクセスログ", "無効"],
              ["アクセス解析と追跡", "無効"],
              ["広告とマーケティング", "無効"],
              ["Cookie と LocalStorage", "意図的な使用なし"],
              ["お問い合わせフォームの送信", "無効（メールのみ）"],
              ["ユーザー生成コンテンツ", "受け付けず"],
              ["サードパーティとのデータ共有", "なし"],
              ["サイト間追跡", "なし"],
            ],
          },
        },
        {
          title: "Cookie とブラウザストレージ",
          paragraphs: [
            "Exile2 Guides は、意図的にいかなる Cookie も設定せず、いかなる形式のブラウザストレージにも書き込みません。アクセス解析 Cookie、広告 Cookie、設定 Cookie、またはその他のカテゴリの Cookie は使用しません。",
            "ブラウザは、静的アセットの標準的な HTTP キャッシュエントリを作成する場合があります。これらはブラウザによって管理され、個人データを含まず、標準的な Web キャッシュプロトコルに従って処理されます。詳細については、Cookie ポリシーをご参照ください。",
          ],
        },
        {
          title: "サードパーティサービス",
          paragraphs: [
            "当サイトは、ユーザーデータを収集するサードパーティサービスを一切統合していません。Google Analytics、データ収集機能付きの Cloudflare Analytics、Facebook Pixel、Twitter 追跡、Hotjar、Mixpanel、またはその他のデータ収集サービスは使用していません。",
            "当サイトは静的ファイルを配信する Cloudflare Pages でホストされています。Cloudflare のインフラストラクチャは、セキュリティとパフォーマンスのためにネットワークレベルでリクエストを処理する場合がありますが、当サイト側ではいかなるデータ収集機能も設定していません。",
            "当サイトには、独自のプライバシーポリシーに基づいて運営される外部 Web サイトへのリンクが含まれています。個人情報を提供する前に、各サイトのポリシーを確認することをお勧めします。",
          ],
        },
        {
          title: "データ保護に関するあなたの権利",
          paragraphs: [
            "お客様の法域によっては、次のデータ保護に関する権利が得られる場合があります。",
          ],
          bullets: [
            "アクセス権（GDPR 第 15 条）—ご自身の個人データのコピーを要求する。当サイトは個人データを収集しないため、提供するデータはありません。",
            "訂正権（GDPR 第 16 条）—不正確な個人データの訂正を要求する。個人データを保有していないため該当しません。",
            "消去権（GDPR 第 17 条）—ご自身の個人データの削除を要求する。個人データを保有していないため該当しません。",
            "処理の制限権（GDPR 第 18 条）—データの使用に関する制限を要求する。個人データを保有していないため該当しません。",
            "データポータビリティ権（GDPR 第 20 条）—データの移転を要求する。個人データを保有していないため該当しません。",
            "CCPA —カリフォルニア州住民は、知る権利、削除する権利、販売のオプトアウト、および差別されない権利を有します。当サイトは個人情報を収集または販売しないため、これらの権利は当然に満たされます。",
          ],
        },
        {
          title: "児童のプライバシー",
          paragraphs: [
            "Exile2 Guides は、13 歳未満（またはお客様の法域における適用されるデジタル同意年齢）の児童から意図的に個人データを収集することはありません。いかなるユーザーからも個人データを収集しないため、これは当然に当てはまります。",
            "保護者または後見人であって、予期せぬ仕組みを通じて児童が個人データを提供したと思われる場合は、ご連絡ください。状況に対処する適切な措置を講じます。",
          ],
        },
        {
          title: "国際的なデータ転送",
          paragraphs: [
            "Exile2 Guides は個人データを収集、保存、または処理しないため、開示すべき国際的なデータ転送はありません。静的コンテンツはグローバルなコンテンツ配信ネットワークを通じて配信されますが、これらの配信に個人データが含まれることも、そこから派生することもありません。",
          ],
        },
        {
          title: "本プライバシーポリシーの変更",
          paragraphs: [
            "当サイトは、取り扱い、技術、法的要件、またはその他の要因の変更を反映するため、本プライバシーポリシーを随時更新する場合があります。いかなる重要な変更も、サイト上の目立つ通知によって告知されます。",
            "本ページ上部の「最終更新日」は、直近の改訂を反映しています。変更後に引き続きサイトを利用することは、更新されたポリシーの受諾を意味します。",
            "個人データの収集を伴う取り扱いを導入する場合は、その取り扱いが開始される前に本ポリシーを全面的に書き直し、対象となるユーザーに通知します。",
          ],
        },
        {
          title: "お問い合わせ",
          paragraphs: [
            "本プライバシーポリシーまたは当サイトのデータの取り扱いに関するご質問、ご懸念、またはご要望がある場合は、以下までお問い合わせください。",
            "メール：contact@stratlore.com",
            "適用されるデータ保護規制に従い、プライバシーに関するすべてのお問い合わせには 30 日以内に回答します。",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Exile2 Guides のご利用を規定する完全な利用規約 —同意、ユーザーの行動、知的財産権、免責事項、責任の制限、および紛争解決。",
      title: "利用規約",
      sections: [
        {
          title: "規約の同意",
          paragraphs: [
            "本利用規約（「規約」）は、Exile2 Guides Web サイト（「本サイト」）へのアクセスおよび利用、ならびにサイト上またはサイトを通じて利用可能なすべてのコンテンツ、機能、および能力を規律するものです。",
            "Exile2 Guides にアクセス、閲覧、または利用することにより、お客様は本規約を全文読み、理解し、その全部に拘束されることに同意したものとみなされます。本規約のすべてに同意されない場合は、本サイトにアクセスまたは利用してはなりません。",
            "本規約は、お客様（「ユーザー」）と Exile2 Guides の運営者との間の法的拘束力のある合意を構成します。いかなる変更後も引き続きサイトを利用することは、当該変更の受諾を構成します。",
          ],
        },
        {
          title: "サービスの説明",
          paragraphs: [
            "Exile2 Guides は、コミュニティ制作のゲームガイド、ビルドの推奨、ボス戦略、アイテムデータベース、スキルリファレンス、および Path of Exile 2 に関連するその他の情報コンテンツを提供する、無料の読み取り専用の静的コンテンツ Web サイトです。",
            "本サイトは、ユーザーアカウント、対話型機能、ユーザー生成コンテンツの送信、eコマース、決済処理、または静的コンテンツの表示以外のいかなるサービスも提供しません。",
            "当サイトは、通知の有無を問わず、いつでも本サイトのいかなる部分も変更、中断、または停止する権利を留保します。",
          ],
        },
        {
          title: "適格性",
          paragraphs: [
            "Exile2 Guides は一般向けを目的としています。静的コンテンツへのアクセスに最低年齢の要件はありません。ただし、お客様がお住まいの法域で成年に達していない場合は、保護者または後見人とともに本規約を確認してください。",
            "本サイトを利用することにより、お客様は本規約を締結する法的能力を有し、お客様の利用がお住まいの法域の適用される法律または規制に違反しないことを表明し保証します。",
          ],
        },
        {
          title: "許可される利用",
          paragraphs: [
            "お客様は、コンテンツにアクセスし、閲覧し、利用することができるのは、個人的、非営利、かつ情報提供の目的に限られます。",
            "ソーシャルメディア、フォーラム、またはその他のプラットフォームで当サイトのコンテンツへのリンクを共有することは、適切な帰属が示され、リンクがユーザーを当サイト上のオリジナルのコンテンツに誘導する限り可能です。",
            "個人的なオフライン参照のために、個別のページを印刷または保存することは、コンテンツが変更、再公開、または再配布されない限り可能です。",
          ],
        },
        {
          title: "禁止される行為",
          paragraphs: [
            "お客様は、次の禁止行為のいずれにも関与しないことに同意します。",
          ],
          bullets: [
            "事前の書面による許可なく、自動化されたシステム（ボット、スクレイパー、クローラー）を使用してコンテンツにアクセス、収集、または監視すること。",
            "本サイト、そのサーバー、または接続されたいかなるシステムへの不正アクセスを試みること。",
            "サービス拒否攻撃、負荷試験、または本サイトの運用を妨害しようとするその他の試みを行うこと。",
            "本サイトを通じて、または本サイトに向けてウイルス、マルウェア、またはその他の悪意のあるコードを送信すること。",
            "いかなる人物または実体になりすまし、またはいかなる人物または実体との提携を虚偽表示すること。",
            "違法な目的、または地方、国、国際的ないかなる法律にも違反して本サイトを利用すること。",
            "本サイト上のいかなるセキュリティ対策またはアクセス制御を回避または回避しようと試みること。",
          ],
        },
        {
          title: "知的財産権",
          paragraphs: [
            "Exile2 Guides 上のすべてのオリジナルコンテンツ —編集テキスト、ガイドの構造、データの編纂、デザイン要素、およびサイトのコードを含む— は、適用される著作権、商標、および知的財産法により保護されています。",
            "事前の書面による同意なしに、いかなるオリジナルコンテンツも複製、配布、改変、派生物の作成、公開表示、または商用利用することはできません。",
            "Path of Exile、Path of Exile 2、および関連するすべてのゲームアセットは、Grinding Gear Games Limited の商標です。これらの素材は、コミュニティのガイドおよび解説の目的でフェアユースの原則に基づき使用されています。当サイトは Grinding Gear Games のいかなる知的財産権も所有するものではありません。",
            "いかなるコンテンツがあなたの知的財産権を侵害していると思われる場合は、侵害の詳細な説明を contact@stratlore.com までお知らせください。",
          ],
        },
        {
          title: "保証の否認",
          paragraphs: [
            "EXILE2 GUIDES は、「現状有姿」および「利用可能な限り」の状態で提供され、明示または黙示を問わずいかなる種類の保証もありません。これには、商品性、特定目的への適合性、および権利非侵害の黙示保証が含まれますが、これらに限定されません。",
            "当サイトが中断なく、エラーのない、または完全に安全であること、およびコンテンツが正確、完全、信頼性が高い、最新、またはエラーのないことを保証しません。",
            "ゲームのメカニクスはアップデートにより頻繁に変わることを認識してください。コンテンツは予告なくいつでも古くなる可能性があります。いかなるガイド、ビルドの推奨、または戦略が特定の結果をもたらすことも保証しません。",
            "サイトを通じてダウンロードまたは取得したいかなる素材も、お客様ご自身の判断とリスクでアクセスされます。そのような素材へのアクセスにより生じたお客様のコンピュータシステムへの損害またはデータの損失については、お客様のみが責任を負います。",
          ],
        },
        {
          title: "責任の制限",
          paragraphs: [
            "適用される法律で認められる最大限の範囲において、Exile2 Guides、その運営者、寄稿者、または関連会社は、本サイトの利用または利用不能から生じる、またはこれに関連するいかなる直接的、間接的、付随的、特別、結果的、または懲罰的損害についても、一切責任を負いません。",
            "この制限は、ゲーム内の進行、アイテム、通貨、またはアカウントのステータスの喪失、データの喪失、収益または期待される利益の喪失、および契約違反、不法行為、厳格責任、またはその他の法的理論に基づくかを問わず、いかなる間接的、特別、付随的、結果的、または懲罰的損害を含め、あらゆる形態の損害に適用されます。",
            "これらの制限は、Exile2 Guides がかかる損害の可能性について助言を受けていたかどうかにかかわらず適用されます。いかなるコンテンツまたは本規約に不満がある場合、お客様の唯一の救済措置は本サイトの利用を中止することです。",
          ],
        },
        {
          title: "補償",
          paragraphs: [
            "お客様は、(a) 本サイトへのアクセスまたは利用、(b) 本規約の違反、(c) 知的財産、プライバシー、または所有権を含むいかなる第三者の権利の違反、または (d) お客様のコンテンツまたは行為が第三者に損害を与えたといういかなるクレームについても、Exile2 Guides、その運営者、寄稿者、および関連会社を、これらに関連して生じるいかなるクレーム、責任、損害、損失、費用、および経費（妥当な弁護士費用を含む）からも補償し、免責するために同意します。",
          ],
        },
        {
          title: "規約の変更",
          paragraphs: [
            "当サイトは、単独の裁量によりいつでも本規約を変更する権利を留保します。変更を行う際は、本ページ上部の「最終更新日」を更新します。重要な変更は、サイト上の目立つ通知によって伝達される場合があります。",
            "いかなる変更にも同意されない場合は、本サイトの利用を中止してください。いかなる変更後も引き続き利用することは、改訂された規約の受諾を構成します。",
          ],
        },
        {
          title: "準拠法および紛争解決",
          paragraphs: [
            "本規約は、サイト運営者の所在する法域の法律に従って管理され、解釈されるものとし、法域の抵触に関する規定は考慮されません。",
            "本規約から生じる、または本規約に関連するいかなる紛争も、まず誠実な交渉により解決を試みます。交渉が不成立の場合、紛争は当該法域の管轄裁判所に付託されます。",
            "お客様は、いかなる紛争解決手続も、集団的、併合、または代表的な訴訟ではなく、個別の基準でのみ行われることに同意します。",
          ],
        },
        {
          title: "一般規定",
          paragraphs: [
            "本規約のいずれかの規定が执行力を欠く、または無効と判断された場合、本規約の残りの規定が完全な効力を維持するよう、当該規定は必要最小限の範囲で制限または削除されます。",
            "本規約上のいかなる権利または規定の行使を怠ったとしても、当該権利の放棄とはみなされません。いかなる権利または規定の放棄も、正当に権限を有する代表者によって書面で署名されない限り、効力を生じません。",
            "本規約は、当サイトのプライバシーポリシー、Cookie ポリシー、および免責事項とともに、本サイトのご利用に関するお客様と Exile2 Guides との間の完全な合意を構成します。",
          ],
        },
        {
          title: "連絡先情報",
          paragraphs: [
            "本利用規約に関するご質問は、contact@stratlore.com までお問い合わせください。",
          ],
        },
      ],
    },
  },
};
