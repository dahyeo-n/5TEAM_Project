// API MOVIE 데이터 함수
export async function fetchmovieList() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
        },
    };

    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc",
            options
        );
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error(err);
    }
}

// API CAST 데이터 함수
export async function fetchmovieCast(id) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
        },
    };
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KO`,
            options
        );
        const data = await response.json();
        return data.cast;
    } catch (err) {
        console.error(err);
    }
}

export async function fetchMovieDetails(id) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=ko-KO`,
            options
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function fetchMovieVideo(id) {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzBjZjNhMjBlZGNhZjMxMmIwMjZhZjM1NzhiMTAyOCIsInN1YiI6IjY1OTRmNDQ5NTkwN2RlNDU5OTYzYmZkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jIu9EyJ2GTlw8ENNNk9IuC76BKQ_Ii0J4QAWX_-Jo00",
        },
    };

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
        );
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error(err);
    }
}