export interface Album {
    ID:number,
    albumTitle:String,
    date:String,
    genre:
    {
        genre_id:number,
        genre_name:String,
        image_url:String
    },
    artist:
    {
        ID:number,
        name:String,
        image_url:String
    }
}
