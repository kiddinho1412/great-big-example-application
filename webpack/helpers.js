/**
 * @author: @AngularClass
 */
var path = require('path');

const EVENT = process.env.npm_lifecycle_event || '';

/**
 * Helper functions.
 */
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

function isWebpackDevServer() {
    return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]));
}

var root = path.join.bind(path, ROOT);

const parseString = require('xml2js').parseString;
// return the version number from `pom.xml` file
function parseVersion() {
    let version = null;
    const pomXml = fs.readFileSync('pom.xml', 'utf8');
    parseString(pomXml, (err, result) => {
        if(result.project.version && result.project.version[0]) {
            version = result.project.version[0];
        } else if(result.project.parent && result.project.parent[0] && result.project.parent[0].version && result.project.parent[0].version[0]) {
            version = result.project.parent[0].version[0];
        }
    });
    if(version === null) {
        throw new Error('pom.xml is malformed. No version is defined');
    }
    return version;
}

exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.root = root;
exports.parseVersion = parseVersion;
