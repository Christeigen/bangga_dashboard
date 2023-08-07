function groupAndSumData(data) {
    return data.reduce((acc, item) => {
      const x = item.data.customerId;
      const y = item.data.totalPrice;
      const z = item.data.duration;
      const existingCustomerId = acc.find(a => a.customerId === item.x);
      if (existingCustomerId) {
        existingCustomerId.y += y;
        existingCustomerId.z += z;
      } else {
        acc.push({ x, y, z });
      }
  
      return acc;
    }, []);
  };