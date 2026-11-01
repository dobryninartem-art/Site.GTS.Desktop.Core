// ЗАГЛУШКИ ТОЛЬКО ДЛЯ ПРОВЕРОЧНОЙ СБОРКИ (dotnet build -p:OfflineCheck=true) в среде без доступа к NuGet.
// В обычной сборке используется настоящий пакет System.Drawing.Common.
#nullable disable
using System;
using System.IO;

namespace System.Drawing
{
    internal static class OfflineDrawing
    {
        public static Exception NotAvailable() => new NotSupportedException("Offline stub: System.Drawing.Common is not available in this build.");
    }

    public class Image : IDisposable
    {
        public int Width => throw OfflineDrawing.NotAvailable();
        public int Height => throw OfflineDrawing.NotAvailable();
        public float HorizontalResolution => throw OfflineDrawing.NotAvailable();
        public float VerticalResolution => throw OfflineDrawing.NotAvailable();
        public System.Drawing.Imaging.ImageFormat RawFormat => throw OfflineDrawing.NotAvailable();
        public int[] PropertyIdList => throw OfflineDrawing.NotAvailable();
        public System.Drawing.Imaging.PropertyItem GetPropertyItem(int propid) => throw OfflineDrawing.NotAvailable();
        public void RemovePropertyItem(int propid) => throw OfflineDrawing.NotAvailable();
        public static Image FromFile(string filename) => throw OfflineDrawing.NotAvailable();
        public static Image FromStream(Stream stream) => throw OfflineDrawing.NotAvailable();
        public void Save(string filename) => throw OfflineDrawing.NotAvailable();
        public void Save(string filename, System.Drawing.Imaging.ImageFormat format) => throw OfflineDrawing.NotAvailable();
        public void Save(Stream stream, System.Drawing.Imaging.ImageFormat format) => throw OfflineDrawing.NotAvailable();
        public void Save(string filename, System.Drawing.Imaging.ImageCodecInfo encoder, System.Drawing.Imaging.EncoderParameters encoderParams) => throw OfflineDrawing.NotAvailable();
        public void Save(Stream stream, System.Drawing.Imaging.ImageCodecInfo encoder, System.Drawing.Imaging.EncoderParameters encoderParams) => throw OfflineDrawing.NotAvailable();
        public void RotateFlip(RotateFlipType rotateFlipType) => throw OfflineDrawing.NotAvailable();
        public void Dispose() { }
    }

    public sealed class Bitmap : Image
    {
        public Bitmap(string filename) { }
        public Bitmap(Stream stream) { }
        public Bitmap(Image original) { }
        public Bitmap(Image original, int width, int height) { }
        public Bitmap(Image original, Size newSize) { }
        public Bitmap(int width, int height) { }
        public void SetResolution(float xDpi, float yDpi) => throw OfflineDrawing.NotAvailable();
    }

    public enum RotateFlipType { RotateNoneFlipNone = 0, Rotate90FlipNone = 1, Rotate180FlipNone = 2, Rotate270FlipNone = 3 }

    public enum GraphicsUnit { World = 0, Display = 1, Pixel = 2, Point = 3, Inch = 4, Document = 5, Millimeter = 6 }

    public enum FontStyle { Regular = 0, Bold = 1, Italic = 2, Underline = 4, Strikeout = 8 }

    public sealed class Font : IDisposable
    {
        public Font(string familyName, float emSize) { }
        public Font(string familyName, float emSize, FontStyle style) { }
        public Font(string familyName, float emSize, FontStyle style, GraphicsUnit unit) { }
        public Font(FontFamily family, float emSize, FontStyle style) { }
        public Font(FontFamily family, float emSize, FontStyle style, GraphicsUnit unit) { }
        public float Size => throw OfflineDrawing.NotAvailable();
        public FontFamily FontFamily => throw OfflineDrawing.NotAvailable();
        public float Height => throw OfflineDrawing.NotAvailable();
        public void Dispose() { }
    }

    public sealed class FontFamily
    {
        public FontFamily(string name) { }
        public static FontFamily GenericSansSerif => throw OfflineDrawing.NotAvailable();
    }

    public static class SystemFonts
    {
        public static Font DefaultFont => throw OfflineDrawing.NotAvailable();
    }

    public abstract class Brush : IDisposable { public void Dispose() { } }

    public sealed class SolidBrush : Brush
    {
        public SolidBrush(Color color) { }
    }

    public static class Brushes
    {
        public static Brush White => throw OfflineDrawing.NotAvailable();
        public static Brush Black => throw OfflineDrawing.NotAvailable();
        public static Brush Yellow => throw OfflineDrawing.NotAvailable();
        public static Brush Red => throw OfflineDrawing.NotAvailable();
    }

    public sealed class Pen : IDisposable
    {
        public Pen(Color color) { }
        public Pen(Color color, float width) { }
        public void Dispose() { }
    }

    public sealed class StringFormat : IDisposable
    {
        public StringFormat() { }
        public StringAlignment Alignment { get; set; }
        public StringAlignment LineAlignment { get; set; }
        public void Dispose() { }
    }

    public enum StringAlignment { Near = 0, Center = 1, Far = 2 }

    public sealed class Graphics : IDisposable
    {
        public static Graphics FromImage(Image image) => throw OfflineDrawing.NotAvailable();
        public RectangleF VisibleClipBounds => throw OfflineDrawing.NotAvailable();
        public System.Drawing.Drawing2D.SmoothingMode SmoothingMode { get; set; }
        public System.Drawing.Drawing2D.InterpolationMode InterpolationMode { get; set; }
        public System.Drawing.Drawing2D.PixelOffsetMode PixelOffsetMode { get; set; }
        public System.Drawing.Drawing2D.CompositingQuality CompositingQuality { get; set; }
        public System.Drawing.Text.TextRenderingHint TextRenderingHint { get; set; }
        public void DrawImage(Image image, int x, int y) => throw OfflineDrawing.NotAvailable();
        public void DrawImage(Image image, int x, int y, int width, int height) => throw OfflineDrawing.NotAvailable();
        public void DrawImage(Image image, Rectangle rect) => throw OfflineDrawing.NotAvailable();
        public void DrawImage(Image image, Rectangle destRect, int srcX, int srcY, int srcWidth, int srcHeight, GraphicsUnit srcUnit) => throw OfflineDrawing.NotAvailable();
        public void DrawImage(Image image, Rectangle destRect, Rectangle srcRect, GraphicsUnit srcUnit) => throw OfflineDrawing.NotAvailable();
        public void DrawString(string s, Font font, Brush brush, float x, float y) => throw OfflineDrawing.NotAvailable();
        public void DrawString(string s, Font font, Brush brush, PointF point) => throw OfflineDrawing.NotAvailable();
        public void DrawString(string s, Font font, Brush brush, RectangleF layoutRectangle) => throw OfflineDrawing.NotAvailable();
        public void DrawString(string s, Font font, Brush brush, RectangleF layoutRectangle, StringFormat format) => throw OfflineDrawing.NotAvailable();
        public SizeF MeasureString(string text, Font font) => throw OfflineDrawing.NotAvailable();
        public SizeF MeasureString(string text, Font font, int width) => throw OfflineDrawing.NotAvailable();
        public SizeF MeasureString(string text, Font font, int width, StringFormat format) => throw OfflineDrawing.NotAvailable();
        public void FillRectangle(Brush brush, Rectangle rect) => throw OfflineDrawing.NotAvailable();
        public void FillRectangle(Brush brush, RectangleF rect) => throw OfflineDrawing.NotAvailable();
        public void FillRectangle(Brush brush, float x, float y, float width, float height) => throw OfflineDrawing.NotAvailable();
        public void Clear(Color color) => throw OfflineDrawing.NotAvailable();
        public void Dispose() { }
    }
}

namespace System.Drawing.Imaging
{
    public sealed class ImageFormat
    {
        public ImageFormat(Guid guid) { Guid = guid; }
        public Guid Guid { get; }
        public static ImageFormat Jpeg => new(Guid.Empty);
        public static ImageFormat Png => new(Guid.Empty);
        public static ImageFormat Bmp => new(Guid.Empty);
        public static ImageFormat Gif => new(Guid.Empty);
    }

    public sealed class ImageCodecInfo
    {
        public string MimeType { get; set; }
        public Guid FormatID { get; set; }
        public static ImageCodecInfo[] GetImageEncoders() => throw System.Drawing.OfflineDrawing.NotAvailable();
        public static ImageCodecInfo[] GetImageDecoders() => throw System.Drawing.OfflineDrawing.NotAvailable();
    }

    public sealed class Encoder
    {
        public Encoder(Guid guid) { }
        public static readonly Encoder Quality = new(Guid.Empty);
    }

    public sealed class EncoderParameter : IDisposable
    {
        public EncoderParameter(Encoder encoder, long value) { }
        public void Dispose() { }
    }

    public sealed class EncoderParameters : IDisposable
    {
        public EncoderParameters() : this(1) { }
        public EncoderParameters(int count) { Param = new EncoderParameter[count]; }
        public EncoderParameter[] Param { get; set; }
        public void Dispose() { }
    }

    public sealed class PropertyItem
    {
        public int Id { get; set; }
        public byte[] Value { get; set; }
        public short Type { get; set; }
        public int Len { get; set; }
    }
}

namespace System.Drawing.Drawing2D
{
    public enum SmoothingMode { Invalid = -1, Default = 0, HighSpeed = 1, HighQuality = 2, None = 3, AntiAlias = 4 }
    public enum InterpolationMode { Invalid = -1, Default = 0, Low = 1, High = 2, Bilinear = 3, Bicubic = 4, NearestNeighbor = 5, HighQualityBilinear = 6, HighQualityBicubic = 7 }
    public enum PixelOffsetMode { Invalid = -1, Default = 0, HighSpeed = 1, HighQuality = 2, None = 3, Half = 4 }
    public enum CompositingQuality { Invalid = -1, Default = 0, HighSpeed = 1, HighQuality = 2, GammaCorrected = 3, AssumeLinear = 4 }
}

namespace System.Drawing.Text
{
    public enum TextRenderingHint { SystemDefault = 0, SingleBitPerPixelGridFit = 1, SingleBitPerPixel = 2, AntiAliasGridFit = 3, AntiAlias = 4, ClearTypeGridFit = 5 }
}
