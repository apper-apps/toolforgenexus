import toolsData from "@/services/mockData/tools.json";

class ToolsService {
  async getAll() {
    await this.delay(300);
    return [...toolsData];
  }

  async getById(id) {
    await this.delay(200);
    const tool = toolsData.find(tool => tool.Id === parseInt(id));
    if (!tool) {
      throw new Error(`Tool with id ${id} not found`);
    }
    return { ...tool };
  }

  async getByCategory(category) {
    await this.delay(250);
    return toolsData.filter(tool => tool.category === category).map(tool => ({ ...tool }));
  }

  async getPopular() {
    await this.delay(200);
    return toolsData.filter(tool => tool.popular).map(tool => ({ ...tool }));
  }

  async search(query) {
    await this.delay(300);
    if (!query.trim()) return [...toolsData];
    
    const lowerQuery = query.toLowerCase();
    return toolsData.filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)
    ).map(tool => ({ ...tool }));
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ToolsService();