/**
 * 为标题生成统一的ID
 * @param text 标题文本
 * @param index 标题索引
 * @returns 生成的ID
 */
export function generateHeadingId(text: string, index: number): string {
  const cleanText = text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `heading-${index}-${cleanText}`;
}

/**
 * 为DOM中的标题元素添加ID
 * @param container 包含标题的容器元素
 */
export function addHeadingIds(container: Element): void {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading, index) => {
    if (!heading.id) {
      const text = heading.textContent || '';
      const id = generateHeadingId(text, index);
      heading.id = id;
      console.log(`Generated ID for heading ${index}: ${id} (text: "${text}")`);
    } else {
      console.log(`Heading ${index} already has ID: ${heading.id} (text: "${heading.textContent?.slice(0, 30)}")`);
    }
  });

  // 验证所有标题都有ID
  console.log('All headings after ID generation:');
  headings.forEach((heading, index) => {
    console.log(`  ${index}: id="${heading.id}", text="${heading.textContent?.slice(0, 30)}"`);
  });
}

/**
 * 从HTML字符串中提取标题信息
 * @param htmlContent HTML内容字符串
 * @returns 标题信息数组
 */
export function extractHeadingsFromHTML(htmlContent: string): Array<{
  id: string;
  text: string;
  level: number;
}> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  const items: Array<{
    id: string;
    text: string;
    level: number;
  }> = [];
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent || '';
    const id = generateHeadingId(text, index);
    
    items.push({
      id,
      text,
      level
    });
  });
  
  return items;
}

/**
 * 平滑滚动到指定元素
 * @param elementId 目标元素ID
 * @param offset 偏移量（默认120px）
 */
export function scrollToElement(elementId: string, offset: number = 120): void {
  console.log('=== SCROLL DEBUG START ===');
  console.log('Attempting to scroll to element:', elementId);

  // 首先尝试找到元素
  let element = document.getElementById(elementId);

  if (!element) {
    console.error('Element not found with id:', elementId);

    // 尝试查找所有标题元素进行调试
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log('Available headings:', Array.from(allHeadings).map(h => ({
      id: h.id,
      text: h.textContent?.slice(0, 50),
      tagName: h.tagName
    })));

    // 尝试通过文本内容查找元素
    const headingByText = Array.from(allHeadings).find(h =>
      h.textContent?.toLowerCase().includes(elementId.toLowerCase()) ||
      elementId.toLowerCase().includes(h.textContent?.toLowerCase() || '')
    );

    if (headingByText) {
      console.log('Found heading by text match:', headingByText);
      element = headingByText as HTMLElement;
    } else {
      showScrollIndicator();
      setTimeout(hideScrollIndicator, 1000);
      return;
    }
  }

  console.log('Element found:', element);
  console.log('Element position:', element.getBoundingClientRect());

  // 显示滚动进度指示器
  showScrollIndicator();

  // 添加高亮效果
  element.classList.add('scroll-target-highlight');
  setTimeout(() => {
    element.classList.remove('scroll-target-highlight');
  }, 2000);

  // 尝试多种滚动方法
  const scrollMethods = [
    // 方法1: 使用 scrollIntoView (最简单)
    () => {
      console.log('Trying scrollIntoView method');
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      return true;
    },

    // 方法2: 使用 window.scrollTo
    () => {
      console.log('Trying window.scrollTo method');
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = elementRect.top + currentScrollTop;
      const targetTop = Math.max(0, elementTop - offset);

      console.log('Scroll calculation:', {
        elementTop: elementRect.top,
        currentScrollTop,
        absoluteTop: elementTop,
        targetTop,
        offset
      });

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      return true;
    },

    // 方法3: 直接设置 scrollTop
    () => {
      console.log('Trying direct scrollTop method');
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = elementRect.top + currentScrollTop;
      const targetTop = Math.max(0, elementTop - offset);

      document.documentElement.scrollTop = targetTop;
      document.body.scrollTop = targetTop; // 兼容性
      return true;
    },

    // 方法4: 手动动画
    () => {
      console.log('Trying manual animation method');
      const elementRect = element.getBoundingClientRect();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = elementRect.top + currentScrollTop;
      const targetTop = Math.max(0, elementTop - offset);

      smoothScrollFallback(targetTop);
      return true;
    }
  ];

  // 尝试每种方法
  let methodIndex = 0;
  const tryNextMethod = () => {
    if (methodIndex < scrollMethods.length) {
      try {
        const success = scrollMethods[methodIndex]();
        if (success) {
          console.log(`Scroll method ${methodIndex + 1} executed`);

          // 检查滚动是否实际发生
          const initialScrollTop = window.scrollY;
          setTimeout(() => {
            const newScrollTop = window.scrollY;
            console.log('Scroll check:', { initialScrollTop, newScrollTop, changed: Math.abs(newScrollTop - initialScrollTop) > 10 });

            if (Math.abs(newScrollTop - initialScrollTop) < 10 && methodIndex < scrollMethods.length - 1) {
              console.log('Scroll did not occur, trying next method');
              methodIndex++;
              tryNextMethod();
            } else {
              hideScrollIndicator();
            }
          }, 500);
        }
      } catch (error) {
        console.error(`Scroll method ${methodIndex + 1} failed:`, error);
        methodIndex++;
        tryNextMethod();
      }
    } else {
      console.error('All scroll methods failed');
      hideScrollIndicator();
    }
  };

  tryNextMethod();

  console.log('=== SCROLL DEBUG END ===');
}

/**
 * 简单的测试滚动函数
 * @param elementId 目标元素ID
 */
export function testScroll(elementId: string): void {
  console.log('=== TEST SCROLL ===');
  console.log('Looking for element:', elementId);

  const element = document.getElementById(elementId);
  if (element) {
    console.log('Element found, attempting scroll...');
    console.log('Current scroll position:', window.scrollY);
    console.log('Element position:', element.getBoundingClientRect());

    // 最简单的滚动测试
    window.scrollTo({
      top: window.scrollY + 500, // 向下滚动500px
      behavior: 'smooth'
    });

    setTimeout(() => {
      console.log('After test scroll:', window.scrollY);
    }, 1000);
  } else {
    console.log('Element not found');
  }
}

/**
 * 手动实现的平滑滚动动画（兼容性回退）
 * @param targetTop 目标滚动位置
 */
function smoothScrollFallback(targetTop: number): void {
  const startTop = window.scrollY || document.documentElement.scrollTop;
  const distance = targetTop - startTop;
  const duration = 800; // 动画持续时间（毫秒）
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // 使用缓动函数
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const currentPosition = startTop + distance * easeInOutCubic(progress);
    window.scrollTo(0, currentPosition);

    if (progress < 1) {
      requestAnimationFrame(animation);
    } else {
      // 滚动完成，隐藏指示器
      hideScrollIndicator();
    }
  }

  requestAnimationFrame(animation);
}

/**
 * 显示滚动进度指示器
 */
function showScrollIndicator(): void {
  // 移除已存在的指示器
  const existingIndicator = document.getElementById('scroll-indicator');
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // 创建新的指示器
  const indicator = document.createElement('div');
  indicator.id = 'scroll-indicator';
  indicator.innerHTML = `
    <div class="scroll-indicator-content">
      <div class="scroll-indicator-spinner"></div>
      <span>正在跳转...</span>
    </div>
  `;

  // 添加样式
  indicator.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: fadeInScale 0.3s ease-out;
    pointer-events: none;
  `;

  // 添加内部样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }

    @keyframes fadeOutScale {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
    }

    .scroll-indicator-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .scroll-indicator-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(indicator);
}

/**
 * 隐藏滚动进度指示器
 */
function hideScrollIndicator(): void {
  const indicator = document.getElementById('scroll-indicator');
  if (indicator) {
    indicator.style.animation = 'fadeOutScale 0.3s ease-out forwards';
    setTimeout(() => {
      indicator.remove();
    }, 300);
  }
}
