import Table from '../src/index'

// Instantiates an instance specifically designed for User model
const User = new Table({ 
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

const Offer = new Table({
  table: 'offer',
  schema: 'public',
  columns: [
    'id',
    'offer_name',
    'price',
    'user_id'
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

    test("should return a set of users with id greater than 10" , () => {
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

    test("should return a set of users based on an IN operator" , () => {
        const [ sql , params ] = User.select(
                                     User.columns.username.as('user_name')
                                 )
                                 .from()
                                 .where(
                                     User.columns.id.in(1,2,4)
                                 )
                                 .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" IN($1,$2,$3)')
        expect(params).toEqual(expect.arrayContaining([1,2,4])) 
    })

    test("should return a set of users based on an ANY operator" , () => {
        const [ sql , params ] = User.select(
                                     User.columns.username.as('user_name')
                                 )
                                 .from()
                                 .where(
                                     User.columns.id.any(1,2,4)
                                 )
                                 .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" ANY($1,$2,$3)')
        expect(params).toEqual(expect.arrayContaining([1,2,4])) 
    })

    test("should return a set of users based on an ALL operator" , () => {
        const [ sql , params ] = User.select(
                                     User.columns.username.as('user_name')
                                 )
                                 .from()
                                 .where(
                                     User.columns.id.all(1,2,4)
                                 )
                                 .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" ALL($1,$2,$3)')
        expect(params).toEqual(expect.arrayContaining([1,2,4])) 
    })

    test("should return a set of users that IS NOT included in the specified values" , () => {
        const [ sql , params ] = User.select(
                                     User.columns.username.as('user_name')
                                 )
                                 .from()
                                 .where(
                                     User.columns.id.not().in(1,2,4)
                                 )
                                 .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" NOT IN($1,$2,$3)')
        expect(params).toEqual(expect.arrayContaining([1,2,4])) 
    })

    test("should return a set of users whose id IS NOT NULL" , () => {
      const [ sql , params ] = User.select(
                                  User.columns.username.as('user_name')
                              )
                              .from()
                              .where(
                                  User.columns.id.is().not().null()
                              )
                              .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" IS NOT NULL')
        expect(params).toEqual(expect.arrayContaining([])) 
    })

    test("should return a set of users whose id IS NULL" , () => {
      const [ sql , params ] = User.select(
                                  User.columns.username.as('user_name')
                              )
                              .from()
                              .where(
                                  User.columns.id.is().null()
                              )
                              .end

        expect(sql).toBe('SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."id" IS NULL')
        expect(params).toEqual(expect.arrayContaining([])) 
    })

    test("should return a set of users based on a REGEX match" , () => {
      const [ sql , params ] = User.select(
                                   User.columns.username.as('user_name')
                               )
                               .from()
                               .where(
                                   User.columns.username.match('^j.*')
                               )
                               .end

      expect(sql).toBe(`SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."username"~$1`)
      expect(params).toEqual(expect.arrayContaining(['^j.*'])) 
  })

    test("should return a set of users based on a REGEX, case insensitive match" , () => {
      const [ sql , params ] = User.select(
                                  User.columns.username.as('user_name')
                              )
                              .from()
                              .where(
                                  User.columns.username.matchi('^J.*')
                              )
                              .end

      expect(sql).toBe(`SELECT public."user"."username" as user_name FROM public."user" WHERE public."user"."username"~*$1`)
      expect(params).toEqual(expect.arrayContaining(['^J.*'])) 
    })

    test('should return a set of users based on a subquery in the WHERE clause' , () => {
      const [ sql , params ] = User.select(
                                  User.columns.id,
                                  User.columns.username.as('user_name')
                                )
                                .from()
                                .where(
                                  User.columns.id.in(
                                    Offer.select(
                                      Offer.columns.user_id
                                    )
                                    .from()
                                    .where(
                                      Offer.columns.id.in(1,2,3)
                                    )
                                    .end
                                  )
                                )
                                .end

      expect(sql).toBe('SELECT public."user"."id",public."user"."username" as user_name FROM public."user" WHERE public."user"."id" IN(SELECT public."offer"."user_id" FROM public."offer" WHERE public."offer"."id" IN($1,$2,$3))')
      expect(params).toEqual(expect.arrayContaining([1,2,3]))
    })
})

describe('Testing ORDER BY clause', () => {
  test("should sort the records with an ascending order based on the username" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .orderBy(
                                   User.columns.username.asc()
                                 )
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" ORDER BY public."user"."username" ASC')
    expect(params).toEqual(expect.arrayContaining([]))
  })

  test("should sort the records with a descending order based on the username" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .orderBy(
                                   User.columns.username.desc()
                                 )
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" ORDER BY public."user"."username" DESC')
    expect(params).toEqual(expect.arrayContaining([]))
  })

  test("should sort the records based on the username and id" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .orderBy(
                                   User.columns.username.asc(),
                                   User.columns.id.desc()
                                 )
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" ORDER BY public."user"."username" ASC,public."user"."id" DESC')
    expect(params).toEqual(expect.arrayContaining([]))
  })

})


describe("Testing OFFSET and LIMIT clauses" , () => {
  test("should limit the returned subset to 5 records" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .limit(5)
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" LIMIT $1')
    expect(params).toEqual([5])
  })

  test("should offset the returned subset by 5 records" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .offset(5)
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" OFFSET $1')
    expect(params).toEqual([5])
  })

  test("should offset the returned subset by 5 records and limit it to 3 records" , () => {
    const [ sql , params ] = User.select()
                                 .from()
                                 .limit(3)
                                 .offset(5)
                                 .end

    expect(sql).toBe('SELECT * FROM public."user" LIMIT $1 OFFSET $2')
    expect(params).toEqual([3,5])
  })
})

describe('Testing GROUP BY and aggregates' , () => {
  test("should group the records by username" , () => {
    const [ sql , params ] = User.select(
                              User.columns.username
                            )
                              .from()
                              .groupBy(
                                User.columns.username
                              )
                              .end
    expect(sql).toBe('SELECT public."user"."username" FROM public."user" GROUP BY public."user"."username"')
    expect(params).toEqual(expect.arrayContaining([]))
  })

  test("should group the records by username and email" , () => {
    const [ sql , params ] = User.select(
                              User.columns.username,
                              User.columns.email
                            )
                              .from()
                              .groupBy(
                                User.columns.username,
                                User.columns.email
                              )
                              .end
    expect(sql).toBe('SELECT public."user"."username",public."user"."email" FROM public."user" GROUP BY public."user"."username",public."user"."email"')
    expect(params).toEqual(expect.arrayContaining([]))
  })

  test("should group the offers by name and finds the AVG price" , () => {
    const [ sql , params ] = Offer.select(
                              Offer.columns.offer_name,
                              Offer.columns.price.avg()
                            )
                              .from()
                              .groupBy(
                                Offer.columns.offer_name
                              )
                              .end
    expect(sql).toBe('SELECT public."offer"."offer_name",AVG(public."offer"."price") FROM public."offer" GROUP BY public."offer"."offer_name"')
    expect(params).toEqual(expect.arrayContaining([]))
    
  })

  test("should group the offers by name and finds the SUM price" , () => {
    const [ sql , params ] = Offer.select(
                              Offer.columns.offer_name,
                              Offer.columns.price.sum()
                            )
                              .from()
                              .groupBy(
                                Offer.columns.offer_name
                              )
                              .end
    expect(sql).toBe('SELECT public."offer"."offer_name",SUM(public."offer"."price") FROM public."offer" GROUP BY public."offer"."offer_name"')
    expect(params).toEqual(expect.arrayContaining([]))
    
  })

  test("should group the offers by name and finds the MIN price" , () => {
    const [ sql , params ] = Offer.select(
                              Offer.columns.offer_name,
                              Offer.columns.price.min()
                            )
                              .from()
                              .groupBy(
                                Offer.columns.offer_name
                              )
                              .end
    expect(sql).toBe('SELECT public."offer"."offer_name",MIN(public."offer"."price") FROM public."offer" GROUP BY public."offer"."offer_name"')
    expect(params).toEqual(expect.arrayContaining([]))
    
  })

  test("should group the offers by name and finds the MAX price" , () => {
    const [ sql , params ] = Offer.select(
                              Offer.columns.offer_name,
                              Offer.columns.price.max()
                            )
                              .from()
                              .groupBy(
                                Offer.columns.offer_name
                              )
                              .end
    expect(sql).toBe('SELECT public."offer"."offer_name",MAX(public."offer"."price") FROM public."offer" GROUP BY public."offer"."offer_name"')
    expect(params).toEqual(expect.arrayContaining([]))
    
  })

  test("should group the offers by name and finds the COUNT price" , () => {
    const [ sql , params ] = Offer.select(
                              Offer.columns.offer_name,
                              Offer.columns.price.count()
                            )
                              .from()
                              .groupBy(
                                Offer.columns.offer_name
                              )
                              .end
    expect(sql).toBe('SELECT public."offer"."offer_name",COUNT(public."offer"."price") FROM public."offer" GROUP BY public."offer"."offer_name"')
    expect(params).toEqual(expect.arrayContaining([]))
  })
  
})