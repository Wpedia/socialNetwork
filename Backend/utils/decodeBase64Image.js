function decodeBase64Image(dataString) {
    const matches = dataString.match(/^data:(.*);base64,(.*)$/);

    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    return {
        type: matches[1],
        data: Buffer.from(matches[2], 'base64')
    };
}

export default decodeBase64Image;