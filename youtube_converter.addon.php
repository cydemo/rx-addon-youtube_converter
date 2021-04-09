<?php
if ( !defined('RX_VERSION') ) return;

if ( $called_position !== 'after_module_proc' || $this->module !== 'board' ) return;

if ( in_array($this->act, array('dispBoardContent', 'dispBoardWrite', 'dispBoardWriteComment', 'dispBoardReplyComment', 'dispBoardModifyComment')) )
{
	if ( $this->act === 'dispBoardContent' )
	{
		$oDocument = Context::get('oDocument');
		if ( !$oDocument->document_srl || $oDocument->get('comment_status') !== 'ALLOW' )
		{
			return;
		}
	}

	$editor_config = getModel('editor')->getEditorConfig($this->module_srl);
	$editor_skin = $editor_config->editor_skin;
	$comment_editor_skin = $editor_config->comment_editor_skin;

	if ( $this->act === 'dispBoardContent' )
	{
		if ( $editor_skin === 'ckeditor' || $comment_editor_skin === 'ckeditor' )
		{
			Context::addCssFile(__DIR__ . '/css/default.css');
		}		
		if ( in_array($comment_editor_skin, array('ckeditor', 'froalaeditor')) )
		{
			Context::addJsFile(__DIR__ . '/js/_' . $editor_skin . '.js');
		}
	}
	else
	{
		if ( $this->act === 'dispBoardWrite' )
		{
			if ( in_array($editor_skin, array('ckeditor', 'froalaeditor')) )
			{
				if ( $editor_skin === 'ckeditor' )
				{
					Context::addCssFile(__DIR__ . '/css/default.css');
				}
				Context::addJsFile(__DIR__ . '/js/_' . $editor_skin . '.js');
			}
			else
			{
				return;
			}
		}
		else
		{
			if ( in_array($comment_editor_skin, array('ckeditor', 'froalaeditor')) )
			{
				if ( $comment_editor_skin === 'ckeditor' )
				{
					Context::addCssFile(__DIR__ . '/css/default.css');
				}
				Context::addJsFile(__DIR__ . '/js/_' . $comment_editor_skin . '.js');
			}
			else
			{
				return;
			}
		}
	}
}
else
{
	return;
}