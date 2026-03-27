// Content Management Framework
class ContentManager {
  constructor() {
    this.config = null;
    this.content = {};
    this.currentPage = null;
  }

  async initialize() {
    await this.loadConfig();
    await this.loadAllContent();
    this.generateSidebar();
    this.initializeRouter();
    this.loadInitialPage();
  }

  async loadConfig() {
    try {
      const response = await fetch('./content-config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Failed to load content configuration:', error);
    }
  }

  async loadAllContent() {
    if (!this.config) return;

    for (const section of this.config.navigation) {
      for (const page of section.pages) {
        try {
          const response = await fetch(page.file);
          const content = await response.text();
          this.content[page.id] = this.parseMarkdown(content);
        } catch (error) {
          console.error(`Failed to load content for ${page.id}:`, error);
          this.content[page.id] = this.createPlaceholderContent(page);
        }
      }
    }
  }

  parseMarkdown(markdown) {
    // Simple markdown parser for basic elements
    let html = markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/```(.+?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/^\- (.+)$/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/^\d+\. (.+)$/gim, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');

    return html;
  }

  createPlaceholderContent(page) {
    return `
      <div class="placeholder-content">
        <h1>${page.title}</h1>
        <div class="placeholder-notice">
          <h3>📝 Content Placeholder</h3>
          <p>This section is ready for content addition. The framework is set up and waiting for your documentation.</p>
          <div class="placeholder-actions">
            <p><strong>To add content:</strong></p>
            <ol>
              <li>Edit the file: <code>${page.file}</code></li>
              <li>Add your content using simple markdown</li>
              <li>Save and refresh to see changes</li>
            </ol>
          </div>
        </div>
        <div class="content-template">
          <h3>Content Template</h3>
          <pre><code># ${page.title}

## Overview
[Add your overview here]

## Key Points
- [Point 1]
- [Point 2]
- [Point 3]

## Examples
\`\`\`
[Add code examples here]
\`\`\`

## Additional Resources
- [Resource 1]
- [Resource 2]
</code></pre>
        </div>
      </div>
    `;
  }

  generateSidebar() {
    const sidebar = document.getElementById('sideNav');
    if (!sidebar || !this.config) return;

    let sidebarHTML = '';
    
    for (const section of this.config.navigation) {
      sidebarHTML += `<div class="nav-section">`;
      sidebarHTML += `<p class="nav-section-label">${section.section}</p>`;
      sidebarHTML += `<ul class="nav-pages">`;
      
      for (const page of section.pages) {
        sidebarHTML += `
          <li>
            <a href="#${page.id}" data-page="${page.id}" class="nav-link">
              <span class="nav-icon">${page.icon}</span>
              <span class="nav-text">${page.title}</span>
            </a>
          </li>
        `;
      }
      
      sidebarHTML += `</ul></div>`;
    }

    sidebar.innerHTML = sidebarHTML;
  }

  initializeRouter() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        this.loadPage(pageId);
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu
        const sideNav = document.getElementById('sideNav');
        const menuBtn = document.getElementById('menuBtn');
        if (sideNav && sideNav.classList.contains('open')) {
          sideNav.classList.remove('open');
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
      const pageId = window.location.hash.substring(1);
      if (pageId && this.content[pageId]) {
        this.loadPage(pageId);
      }
    });
  }

  loadPage(pageId) {
    const mainContent = document.querySelector('main');
    if (!mainContent || !this.content[pageId]) return;

    this.currentPage = pageId;
    mainContent.innerHTML = `
      <div class="content-section" id="${pageId}">
        ${this.content[pageId]}
      </div>
    `;

    // Scroll to top
    window.scrollTo(0, 0);
  }

  loadInitialPage() {
    // Load first page or hash-based page
    const hash = window.location.hash.substring(1);
    let pageId = hash;

    if (!pageId || !this.content[pageId]) {
      // Load first available page
      const firstSection = this.config.navigation[0];
      if (firstSection && firstSection.pages.length > 0) {
        pageId = firstSection.pages[0].id;
      }
    }

    if (pageId) {
      this.loadPage(pageId);
      
      // Update active nav state
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === pageId);
      });
    }
  }

  // Public method for adding new content dynamically
  addContent(sectionId, pageData) {
    if (!this.config) return;

    const section = this.config.navigation.find(s => s.id === sectionId);
    if (section) {
      section.pages.push(pageData);
      this.generateSidebar();
      this.loadAllContent();
    }
  }
}

// Initialize the content manager
document.addEventListener('DOMContentLoaded', () => {
  window.contentManager = new ContentManager();
  window.contentManager.initialize();
});
