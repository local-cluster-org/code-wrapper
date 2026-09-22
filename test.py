import openai

client = openai.OpenAI(api_key="sk-...")
resp = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "hello"}],
)

AiModel + Provider=Anthropic — claude_client.py
import anthropic

client = anthropic.Anthropic(api_key="...")
client.messages.create(model="claude-3-opus-20240229", max_tokens=100, messages=[])

AiModel + Provider=Hugging Face — hf_infer.py
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("https://huggingface.co/meta-llama/Llama-3-8b")

AiSdk — package.json
{
  "dependencies": {
    "openai": "^4.52.0",
    "@anthropic-ai/sdk": "^0.24.0"
  }
}

AiLibrary — requirements.txt
langchain==0.2.5
torch==2.3.0
transformers==4.42.3

AiAgent — agent.py (LangChain agent)
from langchain.agents import initialize_agent, Tool
from langchain_openai import ChatOpenAI

agent = initialize_agent(
    tools=[Tool(name="search", func=lambda q: "result", description="web search")],
    llm=ChatOpenAI(model="gpt-4o"),
    agent="zero-shot-react-description",
)

McpServer — mcp_server.py
from mcp.server import Server

server = Server("my-internal-tool-server")

@server.tool()
def run_query(sql: str) -> str:
    return "..."

McpClient — mcp_client.py
from mcp.client import Client

client = Client("stdio://./mcp_server.py")
client.call_tool("run_query", {"sql": "SELECT 1"})
