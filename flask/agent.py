from dotenv import load_dotenv
load_dotenv()
import os, requests
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_postgres import PGVector 
from langchain_postgres.vectorstores import PGVector 
from langchain.tools.retriever import create_retriever_tool
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

embeddings = OpenAIEmbeddings()

db = PGVector(
    embeddings=embeddings,
    collection_name='doc',
    connection=os.getenv('DATABASE_URL'),
    use_jsonb=True,
)

retriever = db.as_retriever()

tool = create_retriever_tool(
    retriever,
    "document_retriever",
    "search information from document",
)

tools = [tool]

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.7
)  

memory = MemorySaver()

agent = create_react_agent(llm, tools, checkpointer=memory)

jwt_token = None
def set_jwt_token(token):
    global jwt_token
    jwt_token = token


# def store_db(text_id):
#     headers = {
#         'Authorization': jwt_token
#     }
#     try:
#         response = requests.get(f'http://127.0.0.1:5000/texts/{text_id}', headers=headers)
#     except:
#         print(response.status_code)
#     document = response.json()['content']
#     text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
#     texts = text_splitter.split_text(document)
#     db.add_texts(texts)

from langchain.schema import Document
def store_db(file):
    document = Document(page_content=file)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)
    texts = text_splitter.split_documents([document])
    print(texts)
    db.add_texts([text.page_content for text in texts])
    

def response(query, text_id):
    print(jwt_token)

    headers = {
        'Authorization': jwt_token,
        'Content-Type': 'application/json',
    }
    config = {"configurable": {"thread_id": "1"}}
    res = agent.invoke({"messages": query}, config=config)
    try:
        response = requests.post(f'http://127.0.0.1:5000/answers/{text_id}', headers=headers, json={'content': res['messages'][-1].content})
    except: 
        print(response.status_code)
    print(response)
    return res['messages'][-1].content
