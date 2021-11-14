export interface Concert {
    concert_id:number,
    date:String,
    name:String,
    location:
    {
        location_id:number,
        city:String,
        state:String
    }
}
