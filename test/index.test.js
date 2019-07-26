import PgSQL from '../src/index'
import { exportAllDeclaration } from '@babel/types';

// Instantiates an instance specifically designed for User model
const User = new PgSQL({ 
    table : 'user' , 
    schema: 'public',
    columns: [
        'id',
        'username',
        'email',
        'password',
        'role'
    ]
})

test('should select all records from User model' , () => {
    const [ sql , params ] = User.select().from().end // defaults to *
    expect(sql).toBe('SELECT * FROM public."user"')
    expect(params).toEqual(expect.arrayContaining([]))
})

test('should select the id and username of the User model',  ()=> {
    const [ sql , params ] = User.select(User.columns.id, User.columns.username)
                                 .from()
                                 .end
    expect(sql).toBe('SELECT public."user"."id",public."user"."username" FROM public."user"')
    expect(params).toEqual(expect.arrayContaining([]))
})

test('should return the id,username,email of the User model, with email renamed as user_email' , ()=> {
    const [ sql , params ] = User.select(User.columns.id,User.columns.username,User.columns.email.as('user_email')) 
                                 .from()
                                 .end
    expect(sql).toBe('SELECT public."user"."id",public."user"."username",public."user"."email" as user_email FROM public."user"')
    expect(params).toEqual(expect.arrayContaining([]))
})

test('should return the id,username,email,password of a user with id=1', ()=> {
    const [ sql , params ] = User.select(User.columns.id,User.columns.username,User.columns.email,User.columns.password)
                                 .from()
                                 .where(User.columns.id.equal(1))
                                 .end;
                                 
    expect(sql).toBe('SELECT public."user"."id",public."user"."username",public."user"."email",public."user"."password" FROM public."user" WHERE public."user"."id"=$1')
    expect(params).toEqual(expect.arrayContaining([1]))
})