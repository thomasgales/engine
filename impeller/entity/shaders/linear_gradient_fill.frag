// Copyright 2013 The Flutter Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include <impeller/texture.glsl>
#include <impeller/types.glsl>

uniform sampler2D texture_sampler;

uniform FragInfo {
  vec2 start_point;
  vec2 end_point;
  float tile_mode;
  float texture_sampler_y_coord_scale;
  float alpha;
  vec2 half_texel;
}
frag_info;

in vec2 v_position;

out vec4 frag_color;

void main() {
  vec2 start_to_end = frag_info.end_point - frag_info.start_point;
  vec2 start_to_position = v_position - frag_info.start_point;
  float t =
      dot(start_to_position, start_to_end) / dot(start_to_end, start_to_end);
  frag_color = IPSampleLinearWithTileMode(
      texture_sampler, vec2(t, 0.5), frag_info.texture_sampler_y_coord_scale,
      frag_info.half_texel, frag_info.tile_mode);
  frag_color =
      vec4(frag_color.xyz * frag_color.a, frag_color.a) * frag_info.alpha;
}
