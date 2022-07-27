export class Post{
  constructor(
    public email : string,
    public id: string,
        public likes: number , 
    public profileImg?: string ,
 public    post?: string[],
  public  username?: string ,
  public  videos?: string[] ,
  public  comments?: Comment[],
 
   ) {
        
    }
     
}

export interface DialogData {
  post: Post;
  // name: string;
}

export class Comment{
  constructor(public name: string, public comment: string, public profileImg: string, public like?: boolean) {}
}



export class Posts{
  constructor(public posts:Post[]){

  }
}



export class NewUsers{
    constructor(public users:User[]){

    }
}

export class User{
    constructor(public email: string, public password: string, public profileImg: string){

    }
}
export class Favourites {
  constructor(
    public favourites: Favourite[]
  )
{}
}

export class Favourite{
  constructor(
    public email: string,
    public id: string,
      public liked: boolean
  ){}
}

export class Bookmarks {
  constructor(
    public bookmarks: Bookmark[]
  )
{}
}

export class Bookmark{
  constructor(
    
    public email: string,
    public id: string,
    public liked: boolean
  ){}
}