
import { axiosInstance } from "./tmdbApi.mjs";
import { addMovieList, addTvList } from "./liked.mjs";

/**
 * Recupera comentarios y puntuaciones de otros usuarios
 */
export async function getInteractionMovie(type, movieId) {
  try {
    const response = await axiosInstance(`/users/interactions-movies/${type}/${movieId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error al obtener interacciones:", error);
  }
}

/**
 * Envía una nueva interacción al backend (comentario o puntuación)
 */
export async function addInteraction(type, movieId, interactionData) {
  try {
    const response = await axiosInstance.patch(
      `/movies/my-interaction-new/${type}/${movieId}`,
      interactionData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      console.log("Interacción enviada:", response.data);
    }
  } catch (error) {
    console.error("Error al enviar interacción:", error);
  }
}

/**
 * Renderiza comentarios existentes desde el backend
 */
async function renderComments(media, movieId, commentContainer) {
  const interData = await getInteractionMovie(media, movieId);
  commentContainer.innerHTML = "";

  if (!interData) return;

  interData.forEach((comment) => {
    const comentario = document.createElement("p");
    comentario.classList.add("comentario");

    const rankeo = document.createElement("p");
    rankeo.classList.add("rankeo");

    const userData = media === "movie" ? comment.userMovie?.[0]?.UserMovie : comment.userTv?.[0]?.UserTv;

    if (userData) {
      comentario.textContent = userData.comment
        ? `${comment.nick}: ${userData.comment}`
        : `Sin comentarios de ${comment.nick}`;

      rankeo.textContent = userData.rank !== null
        ? `${userData.rank}/10 puntos según: ${comment.nick}`
        : `${comment.nick} no calificó la ${media === "movie" ? "película" : "serie"}`;
    }

    commentContainer.append(comentario, rankeo);
  });
}

/**
 * Crea la interfaz para comentar, calificar y likear
 */
export async function setupInteractionUI(media, movie) {
  const interaction = document.querySelector(".interaction");
  const commentContainer = document.querySelector(".commentContainer");
  const commentContainerUser = document.querySelector(".commentContainerUser");

  commentContainer.innerHTML = "";
  commentContainerUser.innerHTML = "";

  await renderComments(media, movie.id, commentContainer);

  const isAuth = (await import("./auth.mjs")).isAuthenticated;

  if (await isAuth()) {
    // Inputs
    const commentInput = document.createElement("textarea");
    commentInput.classList.add("inputComment");
    commentInput.placeholder = "Escribe tu comentario...";

    const rankInput = document.createElement("input");
    rankInput.classList.add("inputRank");
    rankInput.type = "number";
    rankInput.min = 0;
    rankInput.max = 10;
    rankInput.placeholder = "Calificación (0-10)";

    // Botones
    const btnComment = document.createElement("button");
    btnComment.id = "btnComment";
    btnComment.textContent = "Comentar";

    const btnRank = document.createElement("button");
    btnRank.id = "btnRankMovie";
    btnRank.textContent = "Calificar";

    // Like
    const btnLike = document.createElement("img");
    btnLike.id = "btnMovie-liked";

    if (media === "movie") {
      addMovieList(movie, btnLike);
    } else {
      addTvList(movie, btnLike);
    }

    // Eventos
    btnComment.addEventListener("click", async () => {
      const comment = commentInput.value.trim();
      if (comment !== "") {
        await addInteraction(media, movie.id, { comment });
        await renderComments(media, movie.id, commentContainer);
        commentInput.value = "";
      }
    });

    btnRank.addEventListener("click", async () => {
      const rank = Number(rankInput.value);
      if (!isNaN(rank) && rank >= 0 && rank <= 10) {
        await addInteraction(media, movie.id, { rank });
        await renderComments(media, movie.id, commentContainer);
        rankInput.value = "";
      }
    });

    commentContainerUser.append(commentInput, btnComment, rankInput, btnRank, btnLike);
    interaction.append(commentContainerUser, commentContainer);
  } else {
    const aviso = document.createElement("p");
    aviso.classList.add("comentario");
    aviso.textContent = "Debes estar autenticado para comentar o calificar.";
    commentContainer.appendChild(aviso);
    interaction.appendChild(commentContainer);
  }
}
