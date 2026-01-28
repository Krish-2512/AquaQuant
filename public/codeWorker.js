// This wrapper automatically calls the user's "solution" function
self.onmessage = function(e) {
    const { code, input } = e.data;
    const start = performance.now();
    
    try {
      // 1. We wrap their code and explicitly call 'solution(input)'
      const userCode = `
        ${code}
        return typeof solution !== 'undefined' ? solution(input) : "Error: solution function not found";
      `;
      
      const func = new Function('input', userCode);
      const result = func(input);
      const end = performance.now();
  
      self.postMessage({
        success: true,
        output: result,
        time: (end - start).toFixed(2)
      });
    } catch (err) {
      self.postMessage({
        success: false,
        error: err.message,
        time: 0
      });
    }
  };