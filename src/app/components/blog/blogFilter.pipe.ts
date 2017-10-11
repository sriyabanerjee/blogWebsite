import {PipeTransform, Pipe} from '@angular/core';
import { Blog } from './blog';

@Pipe(
{
    name:'blogFilter'
})
export class BlogFilterPipe implements PipeTransform
{
    transform(value : Blog[],filterBy : String)
    {

    }

    
}