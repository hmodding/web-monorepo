import app from '../../app';
import { getRaftVersionsSchema, markdownEditor, slug } from './_commons';

export const getSchema = async () => {
  return {
    type: 'object',
    properties: {
      rmlVersion: {
        type: 'string',
        title: 'RaftModLoader version',
        ...slug.schema,
      },
      raftVersionId: {
        type: 'number',
        ...(await getRaftVersionsSchema(true)),
        title: 'Raft version',
        description: `The update of Raft this loader release was compiled for.`,
      },
      readme: {
        type: 'string',
        title: 'Readme',
        description: `A changelog for this version.`,
      },
      downloadUrl: {
        type: 'string',
        title: 'Release file',
        description: `Upload a file.`,
      },
    },
    required: ['rmlVersion', 'raftVersionId', 'readme', 'downloadUrl'],
  };
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/rmlVersion',
      options: {
        focus: true,
        placeholder: 'rml-version-identifier',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/raftVersionId',
      options: {
        placeholder: 'Please select a version...',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/readme',
      options: {
        placeholder: `# Changelog for RaftModLoader version A.B.C\n\n* Explain what has changed.`,
        ...markdownEditor.uischema.options,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/downloadUrl',
      options: {
        file: true,
        placeholder: 'Select file...',
      },
    },
  ],
};

app.get('/forms/addLoaderVersion', async (req: any, res: any) => {
  res.status(200).send({
    schema: await getSchema(),
    uischema,
  });
});
