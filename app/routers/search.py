from fastapi import Depends, FastAPI, APIRouter, Request
from dependencies import *
from models import pgsql
from models import mlsearch
from datetime import datetime,date
import traceback
router = APIRouter()

@router.get('/api/getquiz', response_model=Response)
async def get_quiz(sort:str='popular',limit:int=10,offset:int=0):
    sort_list = ['popular','noanswer','haveanswer',"timedesc"]
    if sort not in sort_list:
        raise ErrorOwn("请正确输入",408)
    if sort == 'popular':
        quiz_list = await pgsql.popular_quiz(limit,offset)
    elif sort == 'noanswer':
        quiz_list = await pgsql.no_answer_quiz(limit,offset)
    elif sort == 'haveanswer':
        quiz_list = await pgsql.have_list_answer(limit,offset)
    elif sort == 'timedesc':
        quiz_list = await pgsql.quiz_time_desc(limit,offset)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}


@router.get('/api/popularanswer',response_model=Response)
async def popular_answer(qid:int = 0):
    quiz_list = await pgsql.popular_answer(qid)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list}}

@router.get('/api/search',response_model=Response)
async def search(q:str = '', start_time:date=date(1970,1,1),end_time:date=date(date.today().year,date.today().month,date.today().day),offset:int = 0,limit:int = 10):
    quiz_list,search_time,total_num = await mlsearch.search(start_time,end_time,query_text=q,offset=offset,limit=limit)
    try:
        return {'code':200,'message':'查询成功','data':{'quiz_list':quiz_list,'search_time':str(search_time)+'ms','total_num':total_num}}
    except:
        {'code':500,'message':'服务器错误','data':{}}

@router.get('/api/quizinfo',response_model=Response)
async def quiz_info(request:Request,qid:int = 0,userId:str=""):
    if userId != "":
        token = OAuth2PasswordBearer('token')
        token = await token(request)
        userId = (await get_current_user(token=token)).get('userId')
    if qid == 0:
        return {'code':400,'message':'请输入qid','data':{}}
    quiz =await pgsql.quiz_info(qid,userId)
    if len(quiz) == 0:
        return {'code':401,'message':'问题不存在','data':{}}
    # quiz = await make_dict(quiz)
    return {'code':200,'message':'查询成功','data':{'quiz_list':quiz}}

@router.get('/api/search_answer',response_model=Response)
async def search_answer(request:Request,aid:int=0,qid:int=0,userId:str="",limit:int=10,offset:int=0):
    if userId != "":
        token = OAuth2PasswordBearer('token')
        token = await token(request)
        userId = (await get_current_user(token=token)).get('userId')
    sql = 'select id, (select username from web_project."user" u where u."userId"=answer."userId")  username,"userId", qid, time, content,"like", dislike,(select $1=any(like_id::text[])) is_like from web_project.answer where qid = $2 limit $3 offset $4'
    id = qid
    if qid == 0:
        if aid == 0:
           return {'code':401,'message':'参数缺失','data':{}}
        sql = 'select id, (select username from web_project."user" u where u."userId"=answer."userId") username,"userId" ,qid, time, content, "like", dislike,(select $1=any(like_id::text[])) is_like from web_project.answer where id = $2 limit $3 offset $4'
        id = aid
    try:
        res = await pgsql.search_answer(sql,id,userId,limit=limit,offset=offset)
        return {'code':200,'message':'查询成功','data':{'answer_list':res}}
    except:
        traceback.print_exc()
        return {'code':500,'message':'服务器错误','data':{}}

@router.get('/api/total',response_model=Response)
async def search_answer(model:str='soveld'):
    model_list = ['soveld']
    if model not in model_list:
        raise ErrorOwn("请正确输入",408)
    if model == 'soveld':
        return {'code':200,'message':'查询成功','data':{'sum':await pgsql.total_soveld()}}

@router.get('/api/searchkeywords',response_model=Response)
async def search_by_keyWords(keywords:str='',limit:int=10,offset:int=0,sort:str='popular'):
    sort_list = ['popular']
    if sort not in sort_list:
        raise ErrorOwn("请正确输入",408)
    values = await pgsql.search_by_keyWords(keyWords=keywords.split(','),limit=limit,offset=offset,sort=sort)
    return  {'code':200,'message':'查询成功','data':{'quiz_list':values}}
@router.get('/abtest')
async def abtest():
    return ''
