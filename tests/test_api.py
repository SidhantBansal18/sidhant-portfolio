import pytest
from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_health_endpoint():
    """Verify the /health endpoint returns a healthy status and a timestamp."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data

def test_get_all_stocks():
    """Verify the /stocks endpoint returns the correct structure and data."""
    response = client.get("/stocks")
    assert response.status_code == 200
    data = response.json()
    
    # Validate JSON schema
    assert "count" in data
    assert "stocks" in data
    assert isinstance(data["count"], int)
    assert isinstance(data["stocks"], list)
    assert len(data["stocks"]) == data["count"]
    
    # Validate individual stock data structure
    if data["stocks"]:
        stock = data["stocks"][0]
        assert "symbol" in stock
        assert "price" in stock
        assert "change" in stock
        assert "change_percent" in stock
        assert "last_updated" in stock
        assert isinstance(stock["price"], (int, float))

def test_get_stock_valid_symbol():
    """Verify /stocks/{symbol} returns correct data for a known symbol."""
    symbol = "AAPL"
    response = client.get(f"/stocks/{symbol}")
    assert response.status_code == 200
    data = response.json()
    
    assert data["symbol"] == symbol
    assert "price" in data
    assert "change" in data
    assert "change_percent" in data
    assert "last_updated" in data

def test_get_stock_case_insensitivity():
    """Verify /stocks/{symbol} handles lowercase symbols correctly."""
    symbol = "msft"
    response = client.get(f"/stocks/{symbol}")
    assert response.status_code == 200
    data = response.json()
    assert data["symbol"] == "MSFT"

def test_get_stock_invalid_symbol():
    """Verify /stocks/{symbol} returns 404 for an unknown symbol."""
    symbol = "NONEXISTENT"
    response = client.get(f"/stocks/{symbol}")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data
    assert f"Stock symbol '{symbol}' not found" in data["detail"]
