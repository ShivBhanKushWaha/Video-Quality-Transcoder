const { spawn } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

// without resiolution
// function transcodeVideo(inputFile, outputFile, outputFormat = 'mp4', videoCodec = 'libx264', audioCodec = 'aac') {
//     const process = spawn(ffmpegPath, [
//         '-i', inputFile,
//         '-c:v', videoCodec,
//         '-c:a', audioCodec,
//         '-strict', 'experimental', // Necessary for some codecs
//         '-preset', 'ultrafast', // Set the encoding speed
//         '-y', // Overwrite output file if it exists
//         outputFile
//     ]);

//     process.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     process.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     process.on('close', (code) => {
//         if (code === 0) {
//             console.log(`Transcoding completed. Output saved to: ${outputFile}`);
//         } else {
//             console.error(`Error during transcoding. Exit code: ${code}`);
//         }
//     });
// }

// with resolution
function transcodeVideo(inputFile, outputFile, outputFormat = 'mp4', videoCodec = 'libx264', audioCodec = 'aac', resolution = '720p') {
    let resolutionString;

    switch (resolution.toLowerCase()) {
        case '144p':
            resolutionString = '256x144';
            break;
        case '240p':
            resolutionString = '426x240';
            break;
        case '360p':
            resolutionString = '640x360';
            break;
        case '480p':
            resolutionString = '854x480';
            break;
        case '720p':
            resolutionString = '1280x720';
            break;
        case '1080p':
            resolutionString = '1920x1080';
            break;
        case '2k':
            resolutionString = '2560x1440';
            break;
        case '4k':
            resolutionString = '3840x2160';
            break;
        case '8k':
            resolutionString = '7680x4320';
            break;
        case '16k':
            resolutionString = '15360x8640';
            break;
        
        default:
            console.error('Invalid resolution. Using default (720p).');
            resolutionString = '1280x720';
    }

    const process = spawn(ffmpegPath, [
        '-i', inputFile,
        '-c:v', videoCodec,
        '-c:a', audioCodec,
        '-strict', 'experimental',
        '-preset', 'ultrafast',
        '-vf', `scale=${resolutionString}`,
        '-y',
        outputFile
    ]);

    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        if (code === 0) {
            console.log(`Transcoding completed. Output saved to: ${outputFile}`);
        } else {
            console.error(`Error during transcoding. Exit code: ${code}`);
        }
    });
}

// Example usage

const inputFilePath = 'VID-20201117-WA0041.mp4';
const outputFilePath = 'output_video_144p.mp4';
// transcodeVideo(inputFilePath, outputFilePath);
transcodeVideo(inputFilePath, outputFilePath, 'mp4', 'libx264', 'aac', '144p');
