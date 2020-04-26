const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { resolve, join } = require('path');

const baseDir = (...paths) => resolve(__dirname, '../', join(...paths));

const [, , arg] = process.argv;

const localBuild = arg !== 'check';

const generateDocs = async () => {
  const outputFolder = baseDir('docs', 'api');
  const inputFolder = baseDir('temp');

  await exec(
    `api-documenter markdown --input-folder ${inputFolder} --output-folder ${outputFolder}`,
  );
};

const runApiExtractor = async () => {
  const path = baseDir('api-extractor.json');

  const config = ExtractorConfig.loadFileAndPrepare(path);
  const result = Extractor.invoke(config, {
    localBuild,
    showVerboseMessages: true,
    typescriptCompilerFolder: baseDir('node_modules', 'typescript'),
  });

  if (result.succeeded) {
    console.info(
      `API Extractor completed successfully with ${result.warningCount} warnings.`,
    );
  } else if (result.apiReportChanged || result.errorCount > 0) {
    console.error(
      `API Extractor completed with ${result.errorCount} errors and ${result.warningCount} warnings.`,
    );

    if (result.apiReportChanged) {
      console.info(
        '\n\n\nRun yarn api:generate to update your API signature\n\n\n',
      );
    }

    process.exitCode = 1;
  }
};

const run = async () => {
  await runApiExtractor();
  if (localBuild) {
    await generateDocs();
  }
};

run();
