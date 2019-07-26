import PgSQL from '../src/index'

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

describe( "Tesing DML statments of User Table", () => {
    test('should select all records from User model' , () => {
        const [ sql , params ] = User.select()
                                     .from()
                                     .end

        expect(sql).toBe('SELECT * FROM public."user"')
        expect(params).toEqual(expect.arrayContaining([]))
    })
    
    test('should select the id and username of the User model',  ()=> {
        const [ sql , params ] = User.select(
                                        User.columns.id, 
                                        User.columns.username
                                     )
                                     .from()
                                     .end
        expect(sql).toBe('SELECT public."user"."id",public."user"."username" FROM public."user"')
        expect(params).toEqual(expect.arrayContaining([]))
    })
    
    test('should return the id,username,email of the User model, with email renamed as user_email' , ()=> {
        const [ sql , params ] = User.select(
                                        User.columns.id,
                                        User.columns.username,
                                        User.columns.email.as('user_email')
                                     ) 
                                     .from()
                                     .end
        expect(sql).toBe('SELECT public."user"."id",public."user"."username",public."user"."email" as user_email FROM public."user"')
        expect(params).toEqual(expect.arrayContaining([]))
    })
    
    test('should return the id,username,email,password of a user with id=1', ()=> {
        const [ sql , params ] = User.select(
                                        User.columns.id,
                                        User.columns.username,
                                        User.columns.email,
                                        User.columns.password
                                     )
                                     .from()
                                     .where(User.columns.id.equal(1))
                                     .end;
                                     
        expect(sql).toBe('SELECT public."user"."id",public."user"."username",public."user"."email",public."user"."password" FROM public."user" WHERE public."user"."id"=$1')
        expect(params).toEqual(expect.arrayContaining([1]))
    })

    test('should insert a record to User table' , () => {
        const [ sql , params ] = User.insertInto()
                                     .values( 
                                         [
                                            User.columns.id.equal(1),
                                            User.columns.username.equal('john'),
                                            User.columns.email.equal('john@gmail.com'),
                                            User.columns.password.equal('1234'),
                                            User.columns.role.equal('basic')   
                                         ]
                                     )
                                     .end
        expect(sql).toBe(`INSERT INTO public."user" (id,username,email,password,role) VALUES ($1,$2,$3,$4,$5)`)
        expect(params).toEqual(expect.arrayContaining([ 1, 'john', 'john@gmail.com', '1234', 'basic' ]))
    })

    test('should insert multiple records to User table' , () => {
        const [ sql , params ] = User.insertInto()
                                     .values( 
                                         [
                                            User.columns.id.equal(1),
                                            User.columns.username.equal('john'),
                                            User.columns.email.equal('john@gmail.com'),
                                            User.columns.password.equal('1234'),
                                            User.columns.role.equal('basic')   
                                         ],
                                         [
                                            User.columns.id.equal(2),
                                            User.columns.username.equal('foo'),
                                            User.columns.email.equal('foo@gmail.com'),
                                            User.columns.password.equal('1234'),
                                            User.columns.role.equal('basic')   
                                         ]
                                     )
                                     .end
        expect(sql).toBe("INSERT INTO public.\"user\" (id,username,email,password,role) VALUES ($1,$2,$3,$4,$5),($6,$7,$8,$9,$10)")
        expect(params).toEqual(expect.arrayContaining([ 1, 'john', 'john@gmail.com', '1234', 'basic', 2 ,'foo','foo@gmail.com','1234','basic' ]))
    })

    test('should insert a record to User table and return all results' , () => {
        const [ sql , params ] = User.insertInto()
                                     .values( 
                                         [
                                            User.columns.id.equal(1),
                                            User.columns.username.equal('john'),
                                            User.columns.email.equal('john@gmail.com'),
                                            User.columns.password.equal('1234'),
                                            User.columns.role.equal('basic')   
                                         ]
                                     )
                                     .returning()
                                     .all()
                                     .end
        expect(sql).toBe(`INSERT INTO public."user" (id,username,email,password,role) VALUES ($1,$2,$3,$4,$5) RETURNING *`)
        expect(params).toEqual(expect.arrayContaining([ 1, 'john', 'john@gmail.com', '1234', 'basic' ]))
    })

    test('should insert a record to User table and return only the id and username' , () => {
        const [ sql , params ] = User.insertInto()
                                     .values( 
                                         [
                                            User.columns.id.equal(1),
                                            User.columns.username.equal('john'),
                                            User.columns.email.equal('john@gmail.com'),
                                            User.columns.password.equal('1234'),
                                            User.columns.role.equal('basic')   
                                         ]
                                     )
                                     .returning(
                                         User.columns.id,
                                         User.columns.username
                                     )
                                     .end
        expect(sql).toBe(`INSERT INTO public."user" (id,username,email,password,role) VALUES ($1,$2,$3,$4,$5) RETURNING id,username`)
        expect(params).toEqual(expect.arrayContaining([ 1, 'john', 'john@gmail.com', '1234', 'basic' ]))
    })
})