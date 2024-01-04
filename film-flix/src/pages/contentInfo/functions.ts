import { Movies } from "src/types/movies";
import { Series } from "src/types/series";
import { User } from "src/types/user";

let elementID: string = "";
let movieOrNot: boolean = false;

async function getContentInfo(
  id: string,
  type: "movies" | "series",
  onErr: (err: string) => void
): Promise<Movies | Series> {
  try {
    const response = await fetch(`/${type}/${id}`, {
      method: "GET",
    });
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = (await response.json()) as
      | { movie: Movies }
      | { serie: Series };
    // console.log(data);
    if ("movie" in data) {
      return data.movie;
    } else {
      return data.serie;
    }
  } catch (error: any) {
    onErr(error.message);
    return {} as Movies | Series;
  }
}

async function getComments(
  id: string,
  type: "movies" | "series",
  onErr: (err: string) => void
): Promise<any[]> {
  try {
    const responseMovieorNot = await fetch(
      `/${type}/${id}`,
      {
        method: "GET",
      }
    );
    // console.log(responseMovieorNot);
    if (!responseMovieorNot.ok) {
      throw new Error(
        `Error en la solicitud: ${responseMovieorNot.statusText}`
      );
    }
    const dataMovieorNot = (await responseMovieorNot.json()) as
      | { movie: Movies }
      | { serie: Series };
    // console.log(dataMovieorNot);
    if ("movie" in dataMovieorNot) {
      elementID = dataMovieorNot.movie._id;
      movieOrNot = true;
    } else {
      elementID = dataMovieorNot.serie._id;
      movieOrNot = false;
    }

    const response = await fetch("/comments", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log(data);

    // Dependiendo de la petición y que si los identificadores coinciden, se filtra
    // console.log(elementID);
    if (movieOrNot === true) {
      return data.comments.filter(
        (comment: any) => comment.moviesID === elementID
      );
    } else {
      return data.comments.filter(
        (comment: any) => comment.seriesID === elementID
      );
    }
  } catch (error: any) {
    // console.log(error.message);
    return [];
  }
}

async function putFavContent(
  userId: string,
  contentId: string,
  type: "movies" | "series",
  action: "add" | "remove",
  onErr: (err: string) => void
) : Promise<{message: string, user: User}> {
  try {
    const response = await fetch(`/user/favorites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        contentId,
        contentType: type,
        action,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    onErr(error.message);
    return {} as {message: string, user: User};
  }
}

async function getUser(onErr: (err: string) => void) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ?? "",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error: any) {
    onErr(error.message);
  }
}

export { getContentInfo, getComments, putFavContent, getUser, elementID, movieOrNot };
export type { Movies, Series, User };
