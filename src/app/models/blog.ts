import {Catagory} from 'app/models/catagory';

export class Blog
{
    
  public userId : string;
  public name : string;
  public id : number;
  public description: string;
  public userName : string;
  public creationTimeStamp : string;
  public catagoryId : number;
  public catagory?: Catagory;
    
}