"use server";

import { fetchItemById } from "@/app/lib/data";
import { Buffer } from "buffer";

export default async function generateXml(id: string) {
  const data = await fetchItemById(id);

  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <metadata>
    <id>${data.id}</id>
    <user_id>${data.user_id}</user_id>
    <extension>${data.extension}</extension>
    <summary>${data.summary}</summary>
    <description>${data.description}</description>
    <quality>${data.quality}</quality>
    <capacity>${data.capacity}</capacity>
    <adaptable>${data.adaptable}</adaptable>
    <interaction>${data.interaction}</interaction>
    <motivation>${data.motivation}</motivation>
    <design>${data.design}</design>
    <reusable>${data.reusable}</reusable>
    <portable>${data.portable}</portable>
    <toughness>${data.toughness}</toughness>
    <structure>${data.structure}</structure>
    <navigation>${data.navigation}</navigation>
    <operable>${data.operable}</operable>
    <av_accessible>${data.av_accessible}</av_accessible>
    <text_accessible>${data.text_accessible}</text_accessible>
  </metadata>
  `;

  const buffer = Buffer.from(xml, "utf-8");

  return `data:application/xml;base64,${buffer.toString("base64")}`;
}