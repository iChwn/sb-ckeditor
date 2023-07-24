// app.js
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import { Bold, Strikethrough, Italic } from '@ckeditor/ckeditor5-basic-styles'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import { ImageInsert, Image, ImageCaption, ImageStyle, ImageResize, ImageToolbar, ImageUpload} from '@ckeditor/ckeditor5-image'
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
// import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import CustomImageUploadAdapter from './ckAdapter/CustomImageUploadAdapter';

/** @ts-ignore */
class SbEditor extends ClassicEditorBase {
	constructor(props) {
		super(props);
		console.log("Init SbEditor")
	}

	static builtinPlugins = [
		CustomImageUploadAdapter,
		Essentials,
		UploadAdapter,
		Autoformat,
		Bold,
		Strikethrough,
		Italic,
		CKFinder,
		Heading,
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		Table,
		TableToolbar,
		TextTransformation,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		Alignment,
		BlockQuote,
		ImageInsert
	];
	
	// Editor configuration.
	static defaultConfig = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'strikethrough',
				'italic',
				'link',
				'bulletedList',
				'blockQuote',
				'numberedList',
				'|',
				'indent',
				'outdent',
				'|',
				'fontFamily',
				'fontSize',
				'fontColor',
				'fontBackgroundColor',
				'alignment',
				'|',
				// 'imageUpload',
				'insertImage',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo',
				'|'
			]
		},
		image: {
			styles: [
				'alignLeft', 'alignCenter', 'alignRight'
			],
			resizeOptions: [
				{
					name: 'resizeImage:original',
					value: null,
					icon: 'original'
				},
				{
					name: 'resizeImage:50',
					value: '50',
					icon: 'medium'
				},
				{
					name: 'resizeImage:75',
					value: '75',
					icon: 'large'
				}
			],
			toolbar: [
				'imageStyle:alignLeft',
				'imageStyle:alignCenter',
				'imageStyle:alignRight',
				'|',
				'resizeImage:50',
				'resizeImage:75',
				'resizeImage:original',
				'|',
				'imageTextAlternative',
				'toggleImageCaption'
			],
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		fontFamily: {
			options: [
				'default',
				'Ubuntu, Arial, sans-serif',
				'Ubuntu Mono, Courier New, Courier, monospace',
				'Open Sans'
			]
			// supportAllValues: true,
		},
		fontSize: {
			options: [
				'tiny',
				'default',
				'big'
			]
		},
		htmlEmbed: {
			showPreviews: true,
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		uploadFileUrl: '',
		language: 'en',
	};
}

export default SbEditor