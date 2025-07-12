import { useState, useEffect } from "react";
import toolsService from "@/services/api/toolsService";

export const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTools = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await toolsService.getAll();
      setTools(data);
    } catch (err) {
      setError(err.message || "Failed to load tools");
    } finally {
      setLoading(false);
    }
  };

  const searchTools = async (query) => {
    setLoading(true);
    setError("");
    try {
      const data = await toolsService.search(query);
      setTools(data);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const getToolsByCategory = async (category) => {
    setLoading(true);
    setError("");
    try {
      const data = await toolsService.getByCategory(category);
      setTools(data);
    } catch (err) {
      setError(err.message || "Failed to load category tools");
    } finally {
      setLoading(false);
    }
  };

  const getPopularTools = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await toolsService.getPopular();
      setTools(data);
    } catch (err) {
      setError(err.message || "Failed to load popular tools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTools();
  }, []);

  return {
    tools,
    loading,
    error,
    loadTools,
    searchTools,
    getToolsByCategory,
    getPopularTools
  };
};

export const useTool = (id) => {
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTool = async () => {
    if (!id) return;
    
    setLoading(true);
    setError("");
    try {
      const data = await toolsService.getById(id);
      setTool(data);
    } catch (err) {
      setError(err.message || "Failed to load tool");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTool();
  }, [id]);

  return {
    tool,
    loading,
    error,
    loadTool
  };
};