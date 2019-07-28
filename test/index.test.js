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

describe( "Tesing Select clause of User Table", () => {
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
})

describe("Testing DML Insert of User Table" , () => {
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

describe("Testing DML Update of User table" , () => {
    test("should update the username of all records" , () => {
        const [ sql , params ] = User.update().set(User.columns.username.equal('foo')).end

        expect(sql).toBe(`UPDATE public."user" SET public."user"."username"=$1`)
        expect(params).toEqual(expect.arrayContaining(['foo']))
    })

    test("should update multiple attributes of a specified id" , () => {
        const [ sql , params ] = User.update()
                                     .set(
                                         User.columns.username.equal('foo'),
                                         User.columns.email.equal('foo@gmail.com')
                                     )
                                     .where(User.columns.id.equal(10))
                                     .end
        expect(sql).toBe(`UPDATE public."user" SET public."user"."username"=$1,public."user"."email"=$2 WHERE public."user"."id"=$3`)
        expect(params).toEqual(expect.arrayContaining(['foo', 'foo@gmail.com' , 10 ]))
    })

    test("should update multiple attributes of a specified id returning the id,username, and email of the updated record" , () => {
        const [ sql , params ] = User.update()
                                     .set(
                                         User.columns.username.equal('foo'),
                                         User.columns.email.equal('foo@gmail.com')
                                     )
                                     .where(User.columns.id.equal(10))
                                     .returning(
                                         User.columns.id,
                                         User.columns.username,
                                         User.columns.email
                                     )
                                     .end
        expect(sql).toBe(`UPDATE public."user" SET public."user"."username"=$1,public."user"."email"=$2 WHERE public."user"."id"=$3 RETURNING id,username,email`)
        expect(params).toEqual(expect.arrayContaining(['foo', 'foo@gmail.com' , 10 ]))
    })
    
})

describe("Testing DELETE DML of User table", () => {
    test("should delete all records of User table" , () => {
        const [ sql , params ] = User.deleteFrom().end

        expect(sql).toBe('DELETE FROM public."user"')
        expect(params).toEqual(expect.arrayContaining([]))
    })

    test("should delete a set of records with a basic role" , () => {
        const [ sql , params ] = User.deleteFrom()
                                     .where(
                                         User.columns.role.equal('basic')
                                     )
                                     .end

        expect(sql).toBe('DELETE FROM public."user" WHERE public."user"."role"=$1')
        expect(params).toEqual(expect.arrayContaining(['basic']))
    })
})

describe("Testing WHERE clause with multiple operators" , () => {
    test("should select a user based on his/her id" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.id,
                                    User.columns.username.as('user_name'),
                                )
                                .from()
                                .where(
                                    User.columns.id.equal(1)
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."id",public."user"."username" as user_name FROM public."user" WHERE public."user"."id"=$1')
        expect(params).toEqual(expect.arrayContaining([1])) 
    })

    test("should select a user based on his/her username AND email" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name'),
                                    User.columns.email.as('user_email'),
                                )
                                .from()
                                .where(
                                    User.columns.username.equal('foo')
                                    .and( 
                                        User.columns.email.equal('foo@gmail.com') 
                                    )
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name,public."user"."email" as user_email FROM public."user" WHERE public."user"."username"=$1 AND public."user"."email"=$2')
        expect(params).toEqual(expect.arrayContaining(['foo','foo@gmail.com'])) 
    })

    test("should select a user that has either a basic or edit role" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.role.equal('basic')
                                    .or(
                                        User.columns.role.equal('edit')
                                    )
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."role"=$1 OR public."user"."role"=$2')
        expect(params).toEqual(expect.arrayContaining(['basic','edit'])) 
    })

    test("should return a set of users with id greter than 10" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.id.gt(10)
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id">$1')
        expect(params).toEqual(expect.arrayContaining([10])) 
    })

    test("should return a set of users with id greter or equal of 10" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.id.gte(10)
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id">=$1')
        expect(params).toEqual(expect.arrayContaining([10])) 
    })

    test("should return a set of users with id less of 10" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.id.lt(10)
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id"<$1')
        expect(params).toEqual(expect.arrayContaining([10])) 
    })

    test("should return a set of users with id less or equal of 10" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.id.lte(10)
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id"<=$1')
        expect(params).toEqual(expect.arrayContaining([10])) 
    })

    test("should return a set of users with id greater of 10 and less than 20" , () => {
        const [ sql , params ] = User.select(
                                    User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                    User.columns.id.gt(10)
                                    .and(User.columns.id.lt(20))
                                )
                                .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id">$1 AND public."user"."id"<$2')
        expect(params).toEqual(expect.arrayContaining([10,20])) 
    })

})