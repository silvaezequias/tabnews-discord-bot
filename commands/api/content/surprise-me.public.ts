import { EmbedBuilder, EmbedField } from 'discord.js';
import { NotFoundError } from 'errors';
import { Command, Content } from 'interfaces';
import tabnews from 'models/tabnews';

export default {
  data: {
    name: 'surpreenda-me',
    description: 'Te mostra um conteúdo relevante aleatório'
  },
  async run(client, interaction) {
    await interaction.deferReply();
    const { error: contentsError, data: contents } = await tabnews.getContents({
      per_page: 30
    });

    if (contentsError) {
      throw new NotFoundError({
        message: contentsError.message,
        action: contentsError.action,
        errorLocationCode: contentsError.error_location_code,
        errorId: contentsError.error_id,
        key: contentsError.key,
        statusCode: contentsError.status_code,
        log: false
      });
    }

    const randomNumber = Math.floor(Math.random() * contents.length);
    const {
      slug,
      title,
      tabcoins,
      owner_username,
      children_deep_count,
      created_at
    } = contents[randomNumber];
    const { error: childrenError, data: children } =
      await tabnews.getContentChildren(owner_username, slug);

    const contentThumbnailUrl = `${tabnews.getApiUrl()}/contents/${owner_username}/${slug}/thumbnail`;
    const contentOwnerUrl = `${tabnews.getWebsiteUrl()}/${owner_username}`;
    const contentUrl = `${contentOwnerUrl}/${slug}`;

    if (childrenError) {
      throw new NotFoundError({
        ...childrenError,
        log: false
      });
    }

    const responseEmbed = new EmbedBuilder()
      .setAuthor({
        name: `🔗- ${title}`,
        url: contentUrl
      })
      .setImage(contentThumbnailUrl)
      .setFooter({ text: contentUrl })
      .setTimestamp(new Date(created_at))
      .setColor('#24292F');
    const embedFields: EmbedField[] = [];

    embedFields.push({
      inline: true,
      name: 'Autor',
      value: `[${owner_username}](${contentOwnerUrl})`
    });

    embedFields.push({
      inline: true,
      name: 'TabCoins',
      value: `${tabcoins}`
    });

    embedFields.push({
      inline: true,
      name: 'Comentários',
      value: `${children_deep_count}`
    });

    const firstComment: Content<false> = children[0];

    if (firstComment) {
      const firstCommentOwnerUrl = `${tabnews.getWebsiteUrl()}/${
        firstComment?.owner_username
      }`;
      const firstCommentUrl = `${firstCommentOwnerUrl}/${firstComment.slug}`;

      firstComment.body =
        firstComment.body.substring(0, 900) +
        `... [Ler Mais](${firstCommentUrl})`;

      embedFields.push({
        name: `Comentário em destaque • ${firstComment.tabcoins} tabcoin${
          firstComment.tabcoins > 1 ? 's' : ''
        }`,
        value: `\`${firstComment.owner_username}\` - ${firstComment.body}`,
        inline: false
      });
    }

    responseEmbed.addFields(embedFields);

    interaction.editReply({
      embeds: [responseEmbed]
    });
  }
} as Command;
