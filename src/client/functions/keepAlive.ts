const KeepAlive = (token: string): void => {
    setInterval(() => {
        emitNet('mb-ah:keepAlive', token);
    }, 20 * 1000);
};

export default KeepAlive;