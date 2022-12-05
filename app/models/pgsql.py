import asyncio
import asyncpg
from passlib.context import CryptContext
from functools import wraps
from datetime import date

import traceback
pool = None
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
lock = asyncio.Lock()
def check_conn(func):
    @wraps(func)
    async def decorated(*args, **argv):
        global pool
        if pool is None:
            await init()
        return await func(*args,**argv)
    return decorated
async def init():
    global pool
    async with lock:
        if pool is None:
            pool = await asyncpg.create_pool(user='rolemee', password='',
                database='web-project' ,host='127.0.0.1',max_size=30)
@check_conn
async def check_register(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select "userId" from web_project."user" where "userId" = $1;'
        values = await connection.fetch(
            sql, userId
        )
        return values
@check_conn
async def register(userId:str,username:str,password:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'INSERT INTO web_project."user" ("userId", username, password) VALUES ($1, $2, $3);'
        values = await connection.execute(
            sql, userId, username, pwd_context.encrypt(password)
        )
        return values

@check_conn
async def login(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select password,rights from web_project."user" where "userId" = $1'
        values = await connection.fetch(
            sql, userId
        )
        return values
@check_conn
async def jwt_get_info(userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select "userId","username" from web_project."user" where "userId" = $1'
        values = await connection.fetch(
            sql,userId
        )
        return values

@check_conn
async def popular_quiz():
    global pool
    async with pool.acquire() as connection:
        sql = 'select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username,time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where time>now()-interval \'6 years\' order by ans_num DESC,"like" DESC limit 10;'
        values = await connection.fetch(
            sql
        )
        return values

@check_conn
async def no_answer_quiz():
    global pool
    async with pool.acquire() as conn:
        sql = 'select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username ,time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where ans_num=0 order by time DESC limit 10;'
        values = await conn.fetch(
            sql
        )
        return values
@check_conn
async def have_list_answer():
    global pool
    async with pool.acquire() as conn:
        sql = 'select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username ,time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where ans_num!=0 order by time DESC limit 10;'
        values = await conn.fetch(
            sql
        )
        return values

@check_conn
async def popular_answer(qid:int):
    global pool
    async with pool.acquire() as connection:
        sql = 'select id, (select username from web_project."user" u where u."userId"=quiz."userId") username , qid, time, content,"like","dislike",("userId" =any("like_id")) is_like from web_project.answer where qid=$1 order by "like" DESC , dislike limit 1;'
        values = await connection.fetch(
            sql,qid
        )
        return values

@check_conn
async def quiz_info(qid:int,userId:str):
    global pool
    async with pool.acquire() as connection:
        sql = 'select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username,"userId" ,time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num,(select $1=any(like_id::text[])) is_like,(select $1=any(star_id::text[])) is_star from web_project.quiz where qid=$2;'
        values = await connection.fetch(
            sql,userId,qid
        )
        return values

@check_conn
async def like(qid:int,aid:int,uid:str):
    global pool
    async with pool.acquire() as connection:
        table = 'answer'
        query = 'id'
        id = aid
        if qid != 0:
            table = 'quiz'
            query = 'qid'
            id = qid
        sql = f'select like_id from web_project.{table} where {query} = $1'
        values = await connection.fetch(
            sql, id
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if uid in values[0].get('like_id'):
            return {'code':'401','message':'你已经点赞过该问题','data':{}}
        sql = 'update web_project.%s set "like"="like"+1, like_id = like_id || $1 where %s=%s' %(table,query,id)
        try:
            async with connection.transaction():
                values = await connection.execute(
                    sql , [uid]
                )
                return {'code':'200','message':'点赞成功','data':{}}
        except:
            traceback.print_exc()
            return {'code':'500','message':'系统错误','data':{}}

@check_conn
async def remove_like(qid:int,aid:int,uid:str):
    global pool
    async with pool.acquire() as connection:
        table = 'answer'
        query = 'id'
        id = aid
        if qid != 0:
            table = 'quiz'
            query = 'qid'
            id = qid
        sql = f'select like_id from web_project.{table} where {query} = $1'
        values = await connection.fetch(
            sql, id
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if uid not in values[0].get('like_id'):
            return {'code':'401','message':'你还未点赞该问题','data':{}}
        sql = 'update web_project.%s set "like"="like"-1, like_id = array_remove(like_id,$1) where %s=%s' %(table,query,id)
        try:
            async with connection.transaction():
                values = await connection.execute(
                    sql , uid
                )
                return {'code':'200','message':'取消点赞成功','data':{}}
        except:
            traceback.print_exc()
            return {'code':'500','message':'系统错误','data':{}}


@check_conn
async def search(start_time:date,end_time:date,id_list:list=[]):
    global pool
    async with pool.acquire() as conn:
        sql = 'select qid, (select username from web_project."user" u where u."userId"=quiz."userId")  username, "userId",time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num from web_project.quiz where qid=any($1) and time > $2 and time < $3;'
        values = await conn.fetch(
            sql, id_list, start_time,end_time
        )
        return values
@check_conn
async def search_answer(sql:str = '' ,id:int = 0,userId:str="",limit:int=10,offset:int=0):
    global pool
    async with pool.acquire() as conn:
        values = await conn.fetch(
            sql, userId,id,limit,offset
        )
    return values

@check_conn
async def star(qid:int,userId:str):
    global pool
    async with pool.acquire() as conn:
        sql = 'select star_id from web_project.quiz where qid=$1'
        values = await conn.fetch(
            sql,qid
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if userId in values[0].get('star_id'):
            return {'code':'401','message':'你已经收藏了该问题','data':{}}
        sql = 'update web_project.quiz set star_id = star_id || $1 where qid=$2'
        values = await conn.execute(
            sql,[userId],qid
        )
        return {'code':'200','message':'收藏成功','data':{}}

@check_conn
async def remove_star(qid:int,userId:str):
    global pool
    async with pool.acquire() as conn:
        sql = 'select star_id from web_project.quiz where qid=$1'
        values = await conn.fetch(
            sql,qid
        )
        if len(values) == 0:
            return {'code':'400','message':'未找到该问题','data':{}}
        if userId not in values[0].get('star_id'):
            return {'code':'401','message':'你还未收藏该问题','data':{}}
        sql = 'update web_project.quiz set star_id = array_remove(star_id,$1) where qid=$2'
        values = await conn.execute(
            sql,userId,qid
        )
        return {'code':'200','message':'取消收藏成功','data':{}}

@check_conn
async def post_quiz(userId:str,title:str,content:str,keyWords:list):
    global pool
    async with pool.acquire() as conn:
        sql = '''INSERT INTO web_project.quiz (qid, "userId", time, title, content, "keyWords", "like", dislike, max_like_reply_id,
                ans_num, like_id, star_id)
                VALUES (DEFAULT, $1::varchar(20), DEFAULT, $2::varchar(255), $3::text, $4, DEFAULT, DEFAULT, DEFAULT, DEFAULT,
                DEFAULT, DEFAULT) RETURNING qid;
        '''
        values = await conn.fetch(
            sql,userId,title,content,keyWords
        )
        return values[0].get('qid')

@check_conn
async def check_user(qid:int,table:str='quiz',id:str='qid'):
    global pool
    async with pool.acquire() as conn:
        sql = f'''select "userId" from web_project.{table} where {id}=$1
        '''
        values = await conn.fetch(
            sql,qid
        )
        return values[0].get('userId')

@check_conn
async def del_quiz(qid:int):
    global pool
    async with pool.acquire() as conn:
        sql = '''DELETE
            FROM web_project.answer
            WHERE qid = $1::integer;
        '''
        values = await conn.fetch(
            sql,qid
        )
        sql = '''DELETE
            FROM web_project.quiz
            WHERE qid = $1::integer;
        '''
        values = await conn.fetch(
            sql,qid
        )

@check_conn
async def star_quiz(userId:str):
    global pool
    async with pool.acquire() as conn:
        sql = '''select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username,
        time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num from web_project.quiz
         where $1=any("star_id") order by time DESC;
        '''
        values = await conn.fetch(
            sql,userId
        )
        return values
@check_conn
async def user_quiz(userId:str):
    global pool
    async with pool.acquire() as conn:
        sql = '''select qid, (select username from web_project."user" u where u."userId"=quiz."userId") username,
        time, title, content, "keyWords", "like", dislike, max_like_reply_id, ans_num,(select $1=any(like_id::text[])) is_like,(select $1=any(star_id::text[])) is_star from web_project.quiz
         where "userId"=$1 order by time DESC;
        '''
        values = await conn.fetch(
            sql,userId
        )
        return values

@check_conn
async def user_answer(userId:str):
    global pool
    async with pool.acquire() as conn:
        sql = '''select id, (select username from web_project."user" u where u."userId"=answer."userId") username,
        "userId" ,qid, time, content, "like", dislike,(select $1=any(like_id::text[])) is_like 
        from web_project.answer where "userId"= $2 
        '''
        values = await conn.fetch(
            sql,userId,userId
        )
        return values

@check_conn
async def post_answer(userId:str,content:str,qid:int):
    global pool
    async with pool.acquire() as conn:
        sql = '''INSERT INTO web_project.answer (id, "userId", qid, time, content, "like", dislike, like_id)
            VALUES (DEFAULT, $1::varchar(20), $2::integer, DEFAULT, $3::text, DEFAULT, DEFAULT, DEFAULT)
            RETURNING ID;
        '''
        values = await conn.fetch(
            sql,userId,qid,content
            )
        return values[0].get('id')


@check_conn
async def del_answer(aid:int):
    global pool
    async with pool.acquire() as conn:
        sql = '''DELETE
            FROM web_project.answer
            WHERE id = $1::integer;
        '''
        values = await conn.fetch(
            sql,aid
        )