import random
from typing import List, Dict, Optional
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from datetime import datetime

app = FastAPI(
    title="Financial Data Monitor API",
    description="A production-ready FastAPI server for real-time stock monitoring",
    version="1.0.0"
)

# --- Models ---

class StockData(BaseModel):
    symbol: str = Field(..., example="AAPL", description="The stock ticker symbol")
    price: float = Field(..., example=150.25, description="Current stock price")
    change: float = Field(..., example=1.25, description="Price change since previous close")
    change_percent: float = Field(..., example=0.83, description="Percentage change since previous close")
    last_updated: datetime = Field(default_factory=datetime.utcnow, description="Timestamp of the data")

class StockListResponse(BaseModel):
    count: int
    stocks: List[StockData]

# --- Mock Data Generator ---
# In a production environment, this would be replaced by a call to yfinance or a professional financial API.
MOCK_STOCKS = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "BRK.B"]

def generate_mock_stock_data(symbol: str) -> StockData:
    """Generates realistic mock stock data for a given symbol."""
    price = random.uniform(100, 3000)
    change = random.uniform(-10, 10)
    change_percent = (change / price) * 100
    return StockData(
        symbol=symbol,
        price=round(price, 2),
        change=round(change, 2),
        change_percent=round(change_percent, 2),
        last_updated=datetime.utcnow()
    )

# --- Endpoints ---

@app.get(
    "/stocks", 
    response_model=StockListResponse, 
    tags=["Financial Data"],
    summary="Get all monitored stocks",
    description="Fetches current prices and changes for a set of monitored stock tickers."
)
async def get_all_stocks():
    """
    Returns a list of current stock data for all tracked symbols.
    """
    stocks = [generate_mock_stock_data(symbol) for symbol in MOCK_STOCKS]
    return StockListResponse(count=len(stocks), stocks=stocks)

@app.get(
    "/stocks/{symbol}", 
    response_model=StockData, 
    tags=["Financial Data"],
    summary="Get stock data by symbol",
    description="Fetches real-time data for a specific stock ticker symbol."
)
async def get_stock(symbol: str):
    """
    Returns data for a single stock ticker. 
    Raises 404 if the symbol is not in the tracked list.
    """
    symbol_upper = symbol.upper()
    if symbol_upper not in MOCK_STOCKS:
        raise HTTPException(
            status_code=404, 
            detail=f"Stock symbol '{symbol_upper}' not found in monitoring list."
        )
    
    return generate_mock_stock_data(symbol_upper)

@app.get(
    "/health", 
    tags=["System"], 
    summary="Health Check", 
    description="Endpoint to verify if the server is running."
)
async def health_check():
    """
    Returns the server health status.
    """
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    # Standard production uvicorn config
    uvicorn.run(app, host="0.0.0.0", port=8000)
