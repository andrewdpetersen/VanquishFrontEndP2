export interface Album {
    id:number,
    album_title:String,
    date:String,
    genre:
    {
        genre_id:number,
        genre_name:String,
        image_url:String
    },
    artist:
    {
        artist_id:number,
        name:String,
        image_url:String
    }
}
